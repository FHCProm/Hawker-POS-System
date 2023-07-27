import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/base.css";
import App from "./App.vue";
import router from "./vue-router";
import firebaseConfig from "./config/firebaseConfig";
import { initializeApp } from "firebase/app";

const script = document.createElement("script");
script.src = "cordova.js";
document.body.appendChild(script);

initializeApp(firebaseConfig);

const app = createApp(App);

app.use(createPinia());

app.use(router);

app.mount("#app");
