<template>
  <div class="header">
    <div>选择水果</div>
    <cart-with-number></cart-with-number>
  </div>
  <top-menu-bar @changed-category="sortFruit"></top-menu-bar>
  <div class="selection-wrapper">
    <div v-for="fruit in sortedFruits" :key="fruit" class="one">
      <div class="fruit-name-layout" @click="goToDetails(`${fruit.id}`)">
        {{ fruit.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useFruitStore } from "../stores/fruits";
import { useRouter } from "vue-router";
import TopMenuBar from "../components/TopMenuBar.vue";
import CartWithNumber from "../components/CartWithNumber.vue";

const fruitStore = useFruitStore();

const fruits = fruitStore.fruitsForSale;
const sortedFruits = ref([]);
const router = useRouter();

onMounted(() => {
  sortFruit();
});

function goToDetails(fruitId) {
  router.push({ name: "fruitDetail", params: { id: fruitId } });
}

function sortFruit(category) {
  //topMenuBar.value.selectedCategory;
  sortedFruits.value = [];
  for (let i = 0; i < fruits.length; i++) {
    if (fruits[i].category == category) {
      sortedFruits.value.push(fruits[i]);
    }
  }
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
