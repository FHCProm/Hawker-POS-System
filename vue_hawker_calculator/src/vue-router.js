import { createRouter, createWebHashHistory } from "vue-router";
import LandingPage from "./pages/LandingPage.vue";
import EditFruitPage from "./pages/EditFruitPage.vue";
import FruitDetailPage from "./pages/FruitDetailPage.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/edit", component: EditFruitPage },
  { path: "/fruitDetail", component: FruitDetailPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default {
  install(app) {
    app.use(router);
  },
};
