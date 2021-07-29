<template>
  <h1>{{ slug }}</h1>
  <!-- vfor repo list -->
</template>

<script>
export default {
  watch: {
    $route(to, from) {
      document.title = to.meta.title || "GitHub";
    },
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
  },
  created() {
    document.title = this.$route.meta.title + " " + this.$route.params.slug;
  },
};
</script>

<style></style>
