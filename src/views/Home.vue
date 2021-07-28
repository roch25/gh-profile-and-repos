<template>
  <div class="container">
    <div class="searchBox">
      <input
        type="search"
        placeholder="Search user, repository"
        v-model.trim="searchStr"
        @input="oninput"
      />
      <i class="material-icons">search</i>
    </div>

    <div class="results">
      <div class="users" v-if="users.length">
        <h3>Users</h3>
        <div class="" v-for="user in users" :key="user.id">
          <!-- card for each user -->
        </div>
      </div>
      <div class="repos" v-if="repos.length">
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

<style scoped>
.searchBox {
  width: 40%;
  position: relative;
}

.results {
  display: flex;
  margin-top: 1em;
  width: 100%;
  gap: 1em;
}

.users,
.repos {
  display: flex;
  width: 100%;
  justify-content: center;
}

input {
  padding: 10px 30px 10px 5px;
  border: 2px solid silver;
  border-radius: 6px;
  width: 100%;
  position: relative;
}

input::placeholder {
  font-style: italic;
}

.container {
  display: grid;
  place-items: center;
  padding: 1em 3em;
}

i.material-icons {
  position: absolute;
  right: 5px;
  padding: 8px 0;
  cursor: pointer;
}

@media (max-width: 600px) {
  input {
    width: 100%;
  }

  .container {
    padding: 1rem;
  }

  .searchBox {
    width: 90%;
  }

  .results {
    flex-direction: row;
  }
}
</style>
