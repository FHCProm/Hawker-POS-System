<template>
  <div class="header">选择水果</div>
  <div class="edit-button-wrapper">
    <button class="edit-button">更改</button>
  </div>
  <div class="selection-wrapper">
    <div v-for="fruit in fruits" :key="fruit" class="one">
      {{ fruit.name }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFruitStore } from "../stores/fruits";

const fruitStore = useFruitStore();

const fruits = fruitStore.fruitsForSale;
</script>

<style scoped>
.header {
  padding: 1rem 0;
  background: rgb(249, 186, 118);
  width: 100%;
  text-align: center;
}
.edit-button-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: end;
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
  display: grid;
  align-content: center;
  border-radius: 2px;
  margin: 0.5rem;
  padding: 1rem;
  min-height: 120px;
  font-size: 1.5rem;
  font-weight: 800;
  border: 0.8px solid black;
  text-align: center;
}
</style>
