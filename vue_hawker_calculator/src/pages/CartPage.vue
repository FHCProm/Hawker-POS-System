<template>
  <div class="header">结账</div>
  <div class="fruit-detail" v-for="fruit in fruitsTaken" :key="fruit">
    <div class="name-gram-wrapper">
      <div class="fruit-name">{{ fruit.name }}</div>
      <div class="fruit-gram">{{ fruit.kilogram }}kg</div>
    </div>
    <div class="fruit-price">RM{{ fruit.total }}</div>
  </div>
  <div class="plus-button-layout">
    <div class="plus-button-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="3"
        stroke="currentColor"
        class="plus-button"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </div>
  </div>

  <div>
    <div>总额:</div>
    <div>RM10</div>
  </div>
  <div>
    <div>找錢</div>
    <div>下一位</div>
  </div>
</template>

<script setup>
import { useFruitStore } from "../stores/fruits";

const fruitStore = useFruitStore();
const fruitsTaken = fruitStore.fruitsInCart;
</script>

<style scoped>
.header {
  padding: 1rem 1rem;
  font-size: 2rem;
  width: 100%;
  margin-bottom: 1rem;
  color: rgb(121, 120, 118);
}

.fruit-detail {
  display: flex;
  margin: 0 0.5rem;
  justify-content: space-between;
  padding: 1rem;
  align-items: baseline;
  border-bottom: 1px solid rgb(89, 87, 87);
}
.name-gram-wrapper {
  display: flex;
  align-items: baseline;
}
.fruit-name {
  font-size: 2rem;
  padding-right: 10px;
}
.fruit-gram {
  font-size: 1rem;
}
.fruit-price {
  font-size: 1.5rem;
}

.plus-button-layout {
  margin: 0 0.5rem;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.plus-button-wrapper {
  display: grid;
  width: 3rem;
  height: 3rem;
  background: rgb(94, 249, 94);
  align-items: center;
  border-radius: 10px;
  justify-items: center;
}
.plus-button {
  height: 2rem;
  color: white;
  border-radius: 8px;
  width: 2rem;
}
</style>
