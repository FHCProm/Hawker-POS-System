<template>
  <div class="header">
    <BackButton :back-path="backPath"></BackButton>
    <div>輸入水果重量</div>
  </div>
  <div class="fruit-detail" :style="{ background: fruitDetailBackgroundColor }">
    <div class="fruit-name">{{ selectedFruit.name }}</div>
    <div class="fruit-price-wrapper">
      <div class="price-RM">RM</div>
      <div class="price-number">{{ selectedFruit.price }}</div>
      <div class="price-KG">/{{ selectedFruit.measurement }}</div>
    </div>
  </div>

  <calculator
    ref="calculatorComponent"
    :display-value-set="selectedFruit.measuredAmount"
    @data-ready="processCalculatorValue"
  >
    <div class="gram-design-wrapper">
      <div class="gram-design">
        {{ calculatorComponent?.calculatorDisplayValue }}
      </div>
      <div class="measurement-word">{{ selectedFruit.measurement }}</div>
    </div>
  </calculator>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BackButton from "../components/BackButton.vue";
import { useRoute, useRouter } from "vue-router";
import { useFruitStore } from "../stores/fruits";

import calculator from "../components/calculator.vue";

const router = useRouter();

const calculatorComponent = ref(null);
const fruitStore = useFruitStore();
const route = useRoute();
const fruitId = route.params.id;
const pageBeforeThis = route.params.pageBeforeThis;
const fruitDetailBackgroundColor = ref("rgb(144, 197, 235)");
const backPath = ref("/");
const currentTradeId = ref(0);

let selectedFruit = ref({});

onMounted(() => {
  if (pageBeforeThis == "Landing") {
    const fruits = fruitStore.fruitsForSale;
    for (let x = 0; x < fruits.length; x++) {
      if (fruitId == fruits[x].id) {
        selectedFruit.value = fruits[x];
      }
    }
  }
  if (pageBeforeThis == "Cart") {
    fruitDetailBackgroundColor.value = "rgb(235, 199, 144)";
    backPath.value = "/cartPage/0";
    let fruitsTaken = fruitStore.fruitsInCart;
    for (let x = 0; x < fruitsTaken.length; x++) {
      if (Number(fruitId) == fruitsTaken[x].tradeId) {
        selectedFruit.value = fruitsTaken[x];
        calculatorComponent.value.prefillDisplayValue(
          selectedFruit.value.measuredAmount
        );
      }
    }
  }
});

function processCalculatorValue(data) {
  if (data == "" || parseFloat(data) == 0) {
    return;
  }
  const priceOfGood = (
    parseFloat(data) * parseFloat(selectedFruit.value.price)
  ).toFixed(2);

  if (pageBeforeThis == "Landing") {
    let date = new Date();
    currentTradeId.value = date.getTime();
    fruitStore.fruitsInCart.push({
      ...selectedFruit.value,
      measuredAmount: data,
      total: priceOfGood,
      tradeId: currentTradeId.value,
    });
  }
  if (pageBeforeThis == "Cart") {
    let fruitsTaken = fruitStore.fruitsInCart;
    for (let x = 0; x < fruitsTaken.length; x++) {
      if (Number(fruitId) == fruitsTaken[x].tradeId) {
        fruitsTaken[x].total = priceOfGood;
        fruitsTaken[x].measuredAmount = data;
        currentTradeId.value = fruitsTaken[x].tradeId;
      }
    }
  }

  router.push({
    name: "cartPage",
    params: { newTradeId: currentTradeId.value },
  });
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  font-size: 2rem;
  width: 100%;
  margin-bottom: 2rem;
  color: rgb(121, 120, 118);
}

.fruit-detail {
  display: flex;
  align-items: center;
  height: 200px;
  background: rgb(144, 197, 235);
  margin: 0 0.5rem;
  margin-bottom: 0.5rem;
}
.fruit-name {
  flex: 1;
  font-size: 3rem;
  text-align: center;
}
.fruit-price-wrapper {
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.price-number {
  font-size: 3rem;
}

.price-RM {
  font-size: 1rem;
}
.price-KG {
  font-size: 1.5rem;
}

.gram-design-wrapper {
  display: flex;
  /* position: relative; */
  padding: 0.5rem 3rem;
  margin: 1rem 1rem;
  margin-bottom: 1rem;
  justify-content: flex-end;
  box-shadow: inset 2px 2px 6px #8a8b8b;
  background: rgb(163, 178, 163);
}
.gram-design {
  height: 60px;
  font-size: 2rem;
  outline: none;
  display: grid;
  align-items: center;
  margin: 0 1rem;
  border: none;
  overflow: hidden;
}

.measurement-word {
  height: 60px;
  display: grid;
  align-items: center;
}

.calculator-wrapper {
  margin: 0 0.5rem;
  min-height: 300px;
  padding: 0.5rem;
}
.calculator {
  display: grid;
  margin: 0 auto;
  row-gap: 8px;
  column-gap: 8px;
  grid-template-columns: 22.5% 22.5% 22.5% 22.5%;
  grid-template-rows: 22.5% 22.5% 22.5% 22.5%;
  justify-content: center;
}
.number {
  display: grid;
  align-content: center;
  font-size: 1.5rem;
  line-height: 60px;
  text-align: center;
  background: #cecdcd;
  border-radius: 5px;
}
.number:active {
  color: white;
  background: #7d7d7d;
}
.number-7 {
  grid-column: 1/2;
  grid-row: 1/2;
}
.number-8 {
  grid-column: 2/3;
  grid-row: 1/2;
}
.number-9 {
  grid-column: 3/4;
  grid-row: 1/2;
}
.number-4 {
  grid-row: 2/3;
  grid-column: 1/2;
}

.number-5 {
  grid-column: 2/3;
  grid-row: 2/3;
}
.number-6 {
  grid-column: 3/4;
  grid-row: 2/3;
}
.number-1 {
  grid-column: 1/2;
  grid-row: 3/4;
}
.number-2 {
  grid-column: 2/3;
  grid-row: 3/4;
}
.number-3 {
  grid-column: 3/4;
  grid-row: 3/4;
}

.number-dot {
  grid-column: 1/2;
  grid-row: 4/5;
}

.number-0 {
  grid-column: 2/4;
  grid-row: 4/5;
  width: 100%;
}

.number-erase {
  grid-column: 4/5;
  grid-row: 1/3;
  height: 100%;
  background: rgb(245, 88, 88);
}

.number-erase:active {
  color: white;
  background: rgb(246, 63, 50);
}

.number-enter {
  height: 100%;
  grid-column: 4/5;
  grid-row: 3/5;
  background: rgb(101, 240, 117);
}

.number-enter:active {
  color: white;
  background: rgb(12, 244, 39);
}
</style>
