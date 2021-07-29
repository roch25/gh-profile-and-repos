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

    <h3 v-if="searchStr == ''">Popular</h3>
    <div class="results" v-if="users.length || repos.length">
      <div class="users">
        <h4>Users</h4>
        <div>
          <!-- TODO sort by followers check -->
        </div>
        <user class="" v-for="user in users" :key="user.id" :user="{ user }">
          {{ user.id }}
          <!-- TODO route info about user -->
        </user>
      </div>
      <div class="repos">
        <h4>Repositories</h4>
        <repo class="" v-for="repo in repos" :key="repo.id" :repo="repo">
          {{ repo.id }}
        </repo>
      </div>
    </div>
    <div v-else style="padding: 4px; border-radius: 5px; color: white">
      {{ message }}
    </div>
  </div>
</template>

<script>
import Repo from "../components/Repo.vue";
import User from "../components/User1.vue";
const { VITE_AUTH_TOKEN } = import.meta.env;

export default {
  components: {
    Repo,
    User,
  },
  data() {
    let searchStr = "";
    let users = [];
    let repos = [];

    return {
      searchStr,
      repos,
      users,
      message: "Loading",
    };
  },

  methods: {
    async oninput() {
      const searchRes = await fetch(
        `https://api.github.com/search/users?q=${this.searchStr}`,
        {
          method: "GET",
          headers: {
            Authentication: `Basic roch25:${VITE_AUTH_TOKEN}`,
          },
        }
      );
      const searchList = await searchRes.json();
      this.users = searchList.items;
      console.log(searchList);
    },
    async getPopular() {
      // const results = await Promise.all([
      //   ...[
      //     "https://api.github.com/repositories",
      //     "https://api.github.com/users",
      //   ].map((url) => fetch(url)),
      // ]).then((res) => Promise.all(res.map(async (res) => await res.json())));

      const results = await Promise.all([
        ...[
          "https://api.github.com/repositories",
          "https://api.github.com/users",
        ].map((url) =>
          fetch(url, {
            method: "GET",
            headers: {
              Authentication: `Basic roch25:${VITE_AUTH_TOKEN}`,
            },
          })
        ),
      ]).then((res) => Promise.all(res.map(async (res) => await res.json())));

      this.message = "There was a problem loading users and repos";
      this.repos = results[0]?.slice(0, 25);
      this.users = results[1]?.slice(0, 25);
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

h3 {
  padding: 0;
  margin-top: 1em;
}

.results {
  display: flex;
  width: 100%;
  gap: 1em;
}

.users,
.repos {
  display: flex;
  width: 100%;
  justify-items: flex-start;
  flex-direction: column;
  margin: 3px 10px;
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
    flex-direction: column;
  }
}
</style>
