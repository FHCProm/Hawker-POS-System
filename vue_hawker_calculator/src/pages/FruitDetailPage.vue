<template>
  <div class="fruit-detail-page">
    <div class="header">
      <BackButton :back-path="backPath"></BackButton>
      <div>輸入水果重量</div>
    </div>
    <div
      class="fruit-detail"
      :style="{
        background: fruitDetailBackgroundColor,
      }"
    >
      <div class="fruit-name">{{ selectedFruit.name }}</div>
      <div class="fruit-price-wrapper">
        <div class="price-RM">RM</div>
        <div class="price-number">{{ selectedFruit.price }}</div>
        <div class="price-KG">/{{ selectedFruit.measurement }}</div>
      </div>
    </div>

    <DetailCalculator
      ref="calculatorComponent"
      :display-value-set="selectedFruit.measuredAmount"
      @data-ready="processCalculatorValue"
      class="calculator-layout"
    >
      <div class="gram-design-wrapper" :style="{ width: calculatorDimension }">
        <div class="gram-design">
          {{ calculatorComponent?.calculatorDisplayValue }}
        </div>
        <div class="measurement-word">{{ selectedFruit.measurement }}</div>
      </div>
    </DetailCalculator>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BackButton from "../components/BackButton.vue";
import { useRoute, useRouter } from "vue-router";
import { useFruitStore } from "../stores/fruits";

import DetailCalculator from "../components/DetailCalculator.vue";

const router = useRouter();
const calculatorComponent = ref(null);
const fruitStore = useFruitStore();
const route = useRoute();
const fruitId = route.params.id;
const pageBeforeThis = route.params.pageBeforeThis;
const fruitDetailBackgroundColor = ref("rgb(144, 197, 235)");
const calculatorDimension = ref(0);
const backPath = ref("/");
const currentTradeId = ref(0);

let selectedFruit = ref({});

onMounted(() => {
  calculatorDimension.value = `${calculatorComponent.value.calculatorDimension}px`;
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
.fruit-detail-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
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

.calculator-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.gram-design-wrapper {
  display: flex;
  /* position: relative; */
  padding: 0.5rem 3rem;
  margin: 1rem auto;
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
</style>
