<template>
  <section>
    <h2>
      {{ `${slug}'s public repositories` }}
    </h2>
    <div v-if="repos.length">
      <repo
        class=""
        v-for="repo in repos"
        :key="repo.id"
        :language="repo.language"
      >
        <template v-slot:name>
          {{ repo.full_name }}
        </template>
        <template v-slot:description>
          {{ repo.description }}
        </template>
      </repo>
    </div>
    <span v-else>No repositories to show</span>
  </section>
</template>

<script>
const { VITE_AUTH_TOKEN } = import.meta.env;
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
  margin: auto;
  padding: 1em 0;
}

@media (max-width: 600px) {
  section {
    width: 90%;
  }
}
</style>
