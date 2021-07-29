<template>
  <section>
    <a :href="user?.user?.html_url" target="_blank">
      <img :src="user?.user?.avatar_url" :alt="user?.user?.login" />
    </a>
    <div>
      <h4>
        {{ _user?.name }} <span> @{{ user?.user?.login }}</span>
      </h4>

      <div class="stats">
        <router-link
          v-for="(stat, key) in stats"
          :key="stat"
          :to="'/repos/' + user?.user?.login"
        >
          <span>{{ stats[key] }}</span>
          <a> {{ key }} </a>
        </router-link>
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
section {
  box-shadow: 1px 2px 4px silver;
  border-radius: 5px;
  margin: 0.5em 0;
  display: grid;
  grid-template-columns: 1fr 4fr;
  padding: 1em;
  gap: 12px;
  /* flex-direction: ; */
}

img + div {
  display: flex;
  margin-left: 10px;
  flex-direction: column;
}

img {
  border-radius: 50%;
  width: 100%;
  min-width: 100px;
}

h4 {
  margin: 2px;
  padding: 0;
}
span {
  margin: 1px;
  padding: 0;
  font-style: italic;
  font-weight: 100;
}

span.material-icons {
  font-size: inherit;
  color: rgb(167, 164, 164);
}

.stats {
  display: grid;
  padding: 3px 0;
  grid-template-columns: auto auto auto;
  gap: 4px;
}

.stats a {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}

a span + a {
  font-size: xx-small;
  font-style: italic;
}

@media (max-width: 600px) {
  .stats a {
    font-size: x-small;
  }
}
</style>
