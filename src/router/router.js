import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "root",
      path: "/",
      component: Home,
      meta: { title: "GitHub · Search profiles and repositories" },
    },
  ],
});
