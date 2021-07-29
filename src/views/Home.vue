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

    <h3 v-if="searchStr == ''">Popular</h3>
    <div class="columns" v-if="users.length || repos.length">
      <div class="column is-half ">
        <h4>Users</h4>
        <div>
          <!-- TODO sort by followers check -->
        </div>
        <user class="" v-for="user in users" :key="user.id" :user="{ user }" />
      </div>
      <div class="column is-half">
        <h4>Repositories</h4>
        <repo class="" v-for="repo in repos" :key="repo.id">
          <template v-slot:name>
            {{ repo.full_name }}
          </template>
          <template v-slot:description>
            <strong>Description:</strong> {{ repo.description }}
          </template>
          <template v-slot:url>
            <strong>URL: </strong
            ><a :href="repo.url">
              {{ repo.url }}
            </a>
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
      // const results = await Promise.all([
      //   ...[
      //    `https://api.github.com/search/users?q=${this.searchStr}`,
      //     `https://api.github.com/search/repositories?q=${this.searchStr}`,
      //   ].map((url) =>
      //     fetch(url, {
      //       method: "GET",
      //       headers: {
      //         Authentication: `Basic roch25:${VITE_AUTH_TOKEN}`,
      //       },
      //     })
      //   ),
      // ]).then((res) => Promise.all(res.map(async (res) => await res.json())));

      // // this.message = "There was a problem loading users and repos";
      // this.repos = results[0]?.slice(0, 25);
      // this.users = results[1]?.slice(0, 25);

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

      // const searchRep = await fetch(
        //   `https://api.github.com/search/repositories?q=${this.searchStr}`,
      //   {
        //     method: "GET",
      //     headers: {
        //       Authentication: `Basic roch25:${VITE_AUTH_TOKEN}`,
      //     },
      //   }
      // );
      // this.repos = await searchRep.json();

      this.repos = this.repos.filter(repo => repo.name.startsWith(this.searchStr))
      // request fails, so search through popular repos
    },
    async getPopular() {
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

      // this.message = "There was a problem loading users and repos";
      this.repos = results[0]?.slice(0, 25);
      this.users = results[1]?.slice(0, 25);
      // this.sortByFollowers()
    },

    sortByFollowers() {
      const reps = this.users
        .map((user) => user.repos.url)
        .map((url) =>
          fetch(url, {
            method: "GET",
            headers: {
              Authentication: `Basic roch25:${VITE_AUTH_TOKEN}`,
            },
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

<style scoped></style>
