<template>
  <section>
    <div v-if="repos.length" class="repos">
      <h2>
        {{ `${slug}'s public repositories` }}
      </h2>
      <repo class="" v-for="repo in repos" :key="repo.id">
        <template v-slot:name>
          {{ repo.full_name }}
        </template>
        <template v-slot:description>
          {{ repo.description }}
        </template>
        <template v-slot:language>
          <span
            class="material-icons"
            :style="`color: ${colors[repo.language]};`"
          >
            circle </span
          >{{ repo.language }}
        </template>
        <template v-slot:stars>
          <span class="material-icons"> star </span>{{ repo.stargazers_count }}
        </template>
        <template v-slot:forks>
          <span class="material-icons"> call_missed </span>
          {{ repo.forks_count }}
        </template>
      </repo>
    </div>
    <span v-else>No repositories to show</span>
  </section>
</template>

<script>
const { VITE_AUTH_TOKEN } = import.meta.env;

import { colors } from "../assets/colors";
import Repo from "../components/Repo.vue";
export default {
  watch: {
    $route(to, from) {
      document.title = to.meta.title || "GitHub";
    },
  },
  components: {
    Repo,
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
  },
  data() {
    let repos = [];
    return {
      repos,
      colors
    };
  },
  methods: {
    async getRepos() {
      const searchRes = await fetch(
        `https://api.github.com/users/${this.slug}/repos`,
        {
          // method: "GET",
          // headers: {
          //   Authentication: `Basic roch25:${VITE_AUTH_TOKEN}`,
          // },
        }
      );
      this.repos = await searchRes.json();
      // console.log(this.repos);
    },
  },
  async created() {
    document.title = this.$route.meta.title + " " + this.$route.params.slug;
    this.getRepos();
  },
};
</script>

<style scoped>
section {
  width: 80%;
  padding: 1em 0;
  margin: auto;
}

.repos {
  display: grid;
  place-items: center;
  gap: 1em;
}

.material-icons {
  font-size: 1em;
}

@media (max-width: 600px) {
  section {
    width: 90%;
  }
}
</style>
