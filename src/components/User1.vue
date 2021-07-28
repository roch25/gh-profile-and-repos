<template>
  <section>
    <a :href="user?.user?.html_url" target="_blank">
      <img :src="user?.user?.avatar_url" :alt="user?.user?.login" />
      <div>
        <h4>
          {{ _user?.name }} <span> @{{ user?.user?.login }}</span>
        </h4>
        <!-- TODO style -->
        <!-- <div>
          <span></span>
          {{ [_user?.public_repos, _user?.following, _user?.followers] }}
        </div> -->

        <p class="location">{{ _user?.location }}</p>
      </div>
    </a>
  </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    let _user;
    return {
      _user,
    };
  },
  async mounted() {
    const res = await fetch(this.user.user.url);
    const _user = await res.json();
    this._user = _user;
  },
};
</script>

<style scoped>
section {
  box-shadow: 1px 1px 4px silver;
  border-radius: 5px;
  margin: 0.5em 0;
  padding: 1em 2vmin;
  /* flex-direction: ; */
}

img + div {
  display: flex;
  margin-left: 10px;
  flex-direction: column;
}

a {
  display: flex;
}

img {
  border-radius: 50%;
  width: 20%;
  height: 20%;
  min-width: 120px;
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
</style>
