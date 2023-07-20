import { createRouter, createWebHashHistory } from "vue-router";
import LandingPage from "./pages/LandingPage.vue";
import EditFruitPage from "./pages/EditFruitPage.vue";
import FruitDetailPage from "./pages/FruitDetailPage.vue";
import CartPage from "./pages/CartPage.vue";

const routes = [
  { path: "/", name: "home", component: LandingPage },
  { path: "/edit", component: EditFruitPage },
  { path: "/fruitDetail/:id", name: "fruitDetail", component: FruitDetailPage },
  { path: "/cartPage", name: "cartPage", component: CartPage },
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
