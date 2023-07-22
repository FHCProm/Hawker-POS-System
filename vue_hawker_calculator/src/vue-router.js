import { createRouter, createWebHashHistory } from "vue-router";
import LandingPage from "./pages/LandingPage.vue";
import EditFruitPage from "./pages/EditFruitPage.vue";
import FruitDetailPage from "./pages/FruitDetailPage.vue";
import CartPage from "./pages/CartPage.vue";
import TransactionHistoryPage from "./pages/TransactionHistoryPage.vue";

const routes = [
  { path: "/", name: "home", component: LandingPage },
  { path: "/edit", component: EditFruitPage },
  {
    path: "/fruitDetail/:id/:pageBeforeThis",
    name: "fruitDetail",
    component: FruitDetailPage,
  },
  { path: "/cartPage/:newTradeId", name: "cartPage", component: CartPage },
  {
    path: "/historyPage",
    name: "historyPage",
    component: TransactionHistoryPage,
  },
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
