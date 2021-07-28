<template>
  <div>
    <my-header />
    <router-view />
    <my-footer />
  </div>
</template>

<script setup>
import MyHeader from "./components/MyHeader.vue";
import MyFooter from "./components/Footer.vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
html {
  scroll-behavior: smooth;
}

#app {
  font-family: Nunito, Avenir, Helvetica, Arial, sans-serif;
}

main {
  width: 60%;
  margin: auto;
}

@media (max-width: 600px) {
  main {
    width: 90%;
  }
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
