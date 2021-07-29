import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import UserRepos from "../views/UserRepos.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "root",
      path: "/",
      component: Home,
      meta: { title: "GitHub · Search profiles and repositories" },
    },
    {
      name: "repos",
      path: "/repos",
      component: UserRepos,
      meta: { title: "Repositories · GitHub" },
      children: [
        {
          name: "repo",
          path: ":slug",
          component: UserRepos,
          meta: { title: "Repositories · " },
        },
      ],
    },
  ],
});
