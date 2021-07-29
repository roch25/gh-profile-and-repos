<template>
  <section class="box columns is-mobile is-centered is-three-quarters-mobile">
    <a
      :href="user?.user?.html_url"
      target="_blank"
      class="image is-128x128 column is-one-fifth"
    >
      <img
        :src="user?.user?.avatar_url"
        :alt="user?.user?.login"
        class="is-rounded"
      />
    </a>
    <div class="column is-two-thirds">
      <h4>
        {{ _user?.name }} <span class="subtitle is-5"> @{{ user?.user?.login }}</span>
      </h4>

      <div class="level">
        <div class="level-item has-text-centered columns is-3">
          <router-link
            v-for="(stat, key) in stats"
            :key="stat"
            :class="{ link: key == 'repositories' }"
            class="column"
            :to="key == 'repositories' ? '/repos/' + user?.user?.login : '#'"
          >
            <span class="title2">{{ stats[key] }}</span>
            <a class="heading"> {{ key }} </a>
          </router-link>
        </div>
      </div>

      <p class="location">
        <span class="material-icons" v-if="_user?.location"> location_on </span
        >{{ _user?.location }}
      </p>
    </div>
  </section>
</template>

<script>
const { VITE_AUTH_TOKEN } = import.meta.env;
export default {
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    let _user;
    let stats;
    return {
      _user,
      stats,
    };
  },
  methods: {
    async getUserDetails() {
      const res = await fetch(this.user.user.url, {
        method: "GET",
        headers: {
          Authentication: `Basic roch25:${VITE_AUTH_TOKEN}`,
        },
      });
      const _user = await res.json();
      this.stats = {
        repositories: _user?.public_repos,
        following: _user?.following,
        followers: _user?.followers,
      };
      this._user = _user;
    },
  },
  async mounted() {
    this.getUserDetails();
  },
};
</script>

<style scoped>
.link {
  background: rgba(174, 230, 173, 0.4);
  border-radius: 5px;
}
</style>
