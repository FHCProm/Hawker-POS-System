<template>
  <div class="header">选择水果</div>
  <div class="edit-button-wrapper">
    <router-link to="/edit">
      <button class="edit-button primary-button-design">更改</button>
    </router-link>
  </div>
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

const fruitStore = useFruitStore();

const fruits = fruitStore.fruitsForSale;
const router = useRouter();

function goToDetails(fruit) {
  router.push({ name: "fruitDetail", params: { id: fruit } });
}
</script>

<style scoped>
.header {
  padding: 1rem 1rem;
  font-size: 2rem;
  width: 100%;
  margin-bottom: 1rem;
  color: rgb(121, 120, 118);
}
.edit-button-wrapper {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.edit-button {
  margin-right: 0.5rem;
  padding: 0.3rem 1rem;
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
