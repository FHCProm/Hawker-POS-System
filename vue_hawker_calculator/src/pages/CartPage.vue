<template>
  <div class="header">结账</div>
  <div class="fruit-detail" v-for="fruit in fruitsTaken" :key="fruit">
    <div class="name-gram-wrapper">
      <div class="fruit-name">{{ fruit.name }}</div>
      <div class="fruit-gram">{{ fruit.kilogram }}kg</div>
    </div>
    <div class="fruit-price">RM{{ fruit.total }}</div>
  </div>
  <router-link to="/">
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
  </router-link>

  <div class="total-amount-layout">
    <div class="total-amount-label">总额:</div>
    <div class="total-amount-value">RM{{ totalPrice }}</div>
  </div>
  <div class="button-layout">
    <button class="primary-button-design set-aside">放一边</button>
    <button class="primary-button-design collected-money">收到的钱</button>
    <button class="primary-button-design next-person">下一位</button>
  </div>

  <div class="calculate-change">
    <div class="change-first-row-label">收到的钱：</div>
    <div class="change-first-row-value">RM12.50</div>
    <div class="change-second-row-label">水果价钱：</div>
    <div class="change-second-row-value">RM5.00</div>
    <div class="minus-symbol">-</div>
    <div class="first-divider"></div>
    <div class="change-third-row-label">要找的钱:</div>
    <div class="change-third-row-value">RM7.00</div>
    <div class="second-divider"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useFruitStore } from "../stores/fruits";

const fruitStore = useFruitStore();
const fruitsTaken = fruitStore.fruitsInCart;
const totalPrice = ref(0);
onMounted(() => {
  for (let i = 0; i < fruitsTaken.length; i++) {
    totalPrice.value += parseFloat(fruitsTaken[i].total);
  }
  totalPrice.value = totalPrice.value.toFixed(2);
});
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
  border-bottom: 1px solid rgb(196, 194, 194);
}
.name-gram-wrapper {
  display: flex;
  align-items: baseline;
}
.fruit-name {
  font-size: 1.6rem;
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

.total-amount-layout {
  display: flex;
  padding: 1rem;
  font-size: 1.5rem;
  justify-content: flex-end;
  align-items: baseline;
}
.total-amount-label {
  font-size: 1rem;
  margin-right: 1rem;
}
.total-amount-value {
  font-size: 1.8rem;
  font-weight: 600;
}
.button-layout {
  display: flex;
}

.set-aside {
  background: rgb(136, 136, 136);
  flex: 1;
  margin: 0 1rem;
}
.collected-money {
  background: rgb(241, 110, 110);
  flex: 2;
  margin: 0 1rem;
}
.next-person {
  background: rgb(193, 241, 110);
  flex: 2;
  margin: 0 1rem;
}
.calculate-change {
  width: min-content;
  display: grid;
  align-items: center;
  grid-template-columns: 50px min-content min-content;
  white-space: nowrap;
  grid-template-rows: 1fr 1fr 1px 1fr 1px;
  margin-right: 1rem;
  margin-left: auto;
  margin-top: 2rem;
}

.change-first-row-label {
  grid-row: 1/2;
  grid-column: 2/3;
}

.change-first-row-value {
  grid-row: 1/2;
  grid-column: 3/4;
  text-align: end;
}

.change-second-row-label {
  grid-row: 2/3;
  grid-column: 2/3;
}
.change-second-row-value {
  grid-row: 2/3;
  grid-column: 3/4;
  text-align: end;
}

.minus-symbol {
  grid-row: 2/3;
  grid-column: 1/2;
  font-size: 2rem;
  text-align: center;
}

.first-divider {
  grid-row: 3/4;
  grid-column: 1/4;
  width: 100%;
  height: 100%;
  background: gray;
}
.change-third-row-label {
  grid-row: 4/5;
  grid-column: 2/3;
  color: red;
}

.change-third-row-value {
  grid-row: 4/5;
  grid-column: 3/4;
  text-align: end;
  color: red;
}

.second-divider {
  grid-column: 1/4;
  grid-row: 5/6;
  width: 100%;
  height: 100%;
  background: gray;
}
</style>
