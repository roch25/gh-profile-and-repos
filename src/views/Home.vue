<template>
  <div class="container content has-text-centered">
    <div class="" style="display: grid; place-items: center">
      <p class="control has-icons-left">
        <input
          class="input"
          type="search"
          placeholder="Search user, repository"
          v-model.trim="searchStr"
          @input="oninput"
        />
        <span class="icon is-left">
          <i class="material-icons">search</i>
        </span>
      </p>
    </div>

    <div class="columns is-3" style="margin-top: 20px">
      <div class="column is-half" v-if="users.length">
        <h3>Users</h3>
        <div class="" v-for="user in users" :key="user.id">
          <!-- card for each user -->
        </div>
      </div>
      <div class="repos column is-half" v-if="repos.length">
        <h3>Repositories</h3>
        <div class="" v-for="repo in repos" :key="repo.id">
          <!-- card for each repo -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let searchStr = "";
    let users = [];
    let repos = [];
    return {
      searchStr,
      repos,
      users,
    };
  },
  methods: {
    async oninput() {},
    async getPopular() {
      const results = await Promise.all([
        ...[
          "https://api.github.com/repositories",
          "https://api.github.com/users",
        ].map((url) => fetch(url)),
      ]).then((res) => Promise.all(res.map(async (res) => await res.json())));

      this.repos = results[0];
      this.users = results[1];
    },
  },
  async created() {
    this.getPopular();
  },
};
</script>

<style scoped></style>
