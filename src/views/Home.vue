<template>
  <div class="container">
    <div class="searchBox">
      <input
        type="search"
        placeholder="Search users, repositories"
        v-model.trim="searchStr"
        @input="oninput"
      />
      <i class="material-icons">search</i>
    </div>

    <h3 v-if="searchStr == ''">Popular</h3>
    <div class="results" v-if="users.length || repositories.length">
      <div class="users">
        <h4>Users</h4>

        <user class="" v-for="user in users" :key="user.id" :user="{ user }" />
      </div>
      <div class="repositories">
        <h4>Repositories</h4>
        <repo
          class=""
          v-for="repo in repositories"
          :key="repo.id"
        >
          <template v-slot:name>
            {{ repo.full_name }}
          </template>
          <template v-slot:description>
            {{ repo.description }}
          </template>
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
    let repositories = [];

    return {
      searchStr,
      repositories,
      users,
      message: "Loading",
    };
  },

  methods: {

    async search(slug) {
      if (this.searchStr.length > 3) {
        const searchRes = await fetch(
          `https://api.github.com/search/${slug}?q=${this.searchStr}`,
          {
            // method: "GET",
            // headers: {
            //   Authentication: `Basic roch25:${VITE_AUTH_TOKEN}`,
            // },
          }
        );
        const searchList = await searchRes.json();
        this[slug] = searchList.items.slice(0, 5);
      }
    },

    async oninput() {
      this.search("users")
      this.search("repositories")
    

     
      // this.repositories = this.repositories.filter((repo) =>
      //   repo.name.startsWith(this.searchStr)
      // );
      // request fails, so search through popular repositories
    },
    async getPopular() {
      const results = await Promise.all([
        ...[
          "https://api.github.com/repositories",
          "https://api.github.com/users",
        ].map((url) =>
          fetch(url, {
            // method: "GET",
            // headers: {
            //   Authentication: `Basic roch25:${VITE_AUTH_TOKEN}`,
            // },
          })
        ),
      ]).then((res) => Promise.all(res.map(async (res) => await res.json())));
      this.repositories = results[0]?.slice(0, 5);
      this.users = results[1]?.slice(0, 5);
      // this.sortByFollowers()
    },

    sortByFollowers() {
      const reps = this.users
        .map((user) => user.repositories.url)
        .map((url) =>
          fetch(url, {
            // method: "GET",
            // headers: {
            //   Authentication: `Basic roch25:${VITE_AUTH_TOKEN}`,
            // },
          })
        )
        .then((res) => Promise.all(res.map(async (res) => await res.json())));

      // console.log(reps.map(rep => rep.length).sort());
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
.repositories {
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
