<template>
  <div class="header">
    <BackButton back-path="/"></BackButton>
    <div>輸入水果重量</div>
  </div>
  <div class="fruit-detail">
    <div class="fruit-name">{{ fruitName }}</div>
    <div class="fruit-price-wrapper">
      <div class="price-RM">RM</div>
      <div class="price-number">{{ fruitPrice }}</div>
      <div class="price-KG">/kg</div>
    </div>
  </div>
  <div class="gram-design-wrapper">
    <div class="gram-design">{{ fruitKilogram }}</div>
    <div class="kg-word">kg</div>
  </div>

  <div class="calculator-wrapper">
    <div class="calculator" ref="calculator">
      <div class="number number-7" @click="appendNumber('7')">7</div>
      <div class="number number-8" @click="appendNumber('8')">8</div>
      <div class="number number-9" @click="appendNumber('9')">9</div>
      <div class="number number-erase" @click="clearNumber">X</div>
      <div class="number number-4" @click="appendNumber('4')">4</div>
      <div class="number number-5" @click="appendNumber('5')">5</div>
      <div class="number number-6" @click="appendNumber('6')">6</div>
      <div class="number number-1" @click="appendNumber('1')">1</div>
      <div class="number number-2" @click="appendNumber('2')">2</div>
      <div class="number number-3" @click="appendNumber('3')">3</div>
      <div class="number number-dot" @click="appendNumber('.')">.</div>
      <div class="number number-0" @click="appendNumber('0')">0</div>
      <div class="number number-enter" @click="calulcatePrice">Enter</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BackButton from "../components/BackButton.vue";
import { useRoute, useRouter } from "vue-router";
import { useFruitStore } from "../stores/fruits";
import { onMounted, nextTick } from "vue";

const router = useRouter();
const fruitKilogram = ref("0");
let noNumberInCalculator = true;
const calculator = ref(null);

const fruitStore = useFruitStore();
const route = useRoute();
const fruitName = route.params.id;
let fruitPrice = "";

onMounted(() => {
  const calculatorWidth = calculator.value.clientWidth;
  nextTick(() => {
    calculator.value.style.height = `${calculatorWidth}px`;
  });
});

const fruits = fruitStore.fruitsForSale;
for (let x = 0; x < fruits.length; x++) {
  if (fruitName == fruits[x].name) {
    fruitPrice = fruits[x].price;
  }
}

function appendNumber(number) {
  if (noNumberInCalculator) {
    fruitKilogram.value = "";
    noNumberInCalculator = false;
  }

  //need to fix the starting . WHen start with dot only
  const regex = /^\d+\.\d{1}$/;
  if (regex.test(fruitKilogram.value)) {
    return;
  }

  if (number == "." && fruitKilogram.value == "") {
    fruitKilogram.value = "0.";
  }

  if (number == "." && fruitKilogram.value.includes(".")) {
    return;
  }

  if (number == "0" && fruitKilogram.value == "0") {
    return;
  }
  if (fruitKilogram.value == "0") {
    fruitKilogram.value = number;
    return;
  }
  fruitKilogram.value = fruitKilogram.value + number;
}

function clearNumber() {
  noNumberInCalculator = true;
  fruitKilogram.value = "0";
}

function calulcatePrice() {
  if (fruitKilogram.value == "" || parseFloat(fruitKilogram.value) == 0) {
    return;
  }
  const priceOfGood = parseFloat(fruitKilogram.value) * parseFloat(fruitPrice);

  router.push({ name: "cartPage" });
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
  position: relative;
  padding: 0.5rem 3rem;
  margin: 1rem 0.5rem;
  margin-bottom: 1rem;
  justify-content: flex-end;
  box-shadow: 2px 2px 6px #8a8b8b;
}
.gram-design {
  height: 60px;
  font-size: 2rem;
  outline: none;
  margin: 0 1rem;
  border: none;
  overflow: hidden;
}

.kg-word {
  height: 60px;
  padding-top: 20px;
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
