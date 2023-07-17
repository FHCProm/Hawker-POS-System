<template>
  <div class="header">
    <div>选择水果</div>
    <router-link to="/cartPage">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="cart-svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
    </router-link>
  </div>
  <top-menu-bar></top-menu-bar>
  <div class="selection-wrapper">
    <div v-for="fruit in fruits" :key="fruit" class="one">
      <div class="fruit-name-layout" @click="goToDetails(`${fruit.name}`)">
        {{ fruit.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFruitStore } from "../stores/fruits";
import { useRouter } from "vue-router";
import TopMenuBar from "../components/TopMenuBar.vue";

const fruitStore = useFruitStore();

const fruits = fruitStore.fruitsForSale;
const router = useRouter();

function goToDetails(fruit) {
  router.push({ name: "fruitDetail", params: { id: fruit } });
}
</script>

<style scoped>
.header {
  display: flex;
  padding: 0 1rem;
  font-size: 2rem;
  width: 100%;
  height: 80px;
  margin-bottom: 1rem;
  color: rgb(121, 120, 118);
  justify-content: space-between;
  align-items: center;
}

.cart-svg {
  width: 40px;
  height: 40px;
}

.selection-wrapper {
  margin-top: 0.5rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  display: grid;
}

.one {
  border-radius: 2px;
  margin: 0.5rem;
  min-height: 120px;
  font-size: 1.5rem;
  font-weight: 800;
  box-shadow: 4px 4px 6px #d2d3d4, -4px -4px 6px #ffffff, -2px -2px 6px #d2d3d4,
    -4px -4px 6px #ffffff;
}

.one a {
  width: 100%;
  height: 100%;
  display: block;
}

.fruit-name-layout {
  display: grid;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
