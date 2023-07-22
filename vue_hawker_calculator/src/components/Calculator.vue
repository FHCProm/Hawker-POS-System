<template>
  <div class="calculator-wrapper">
    <slot></slot>

    <div class="calculator-keys-wrapper">
      <div class="calculator-keys" ref="calculatorElement">
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
        <div class="number number-enter" @click="sendingCalculatorValue">
          确认
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

let noNumberInCalculator = true;
const calculatorDisplayValue = ref("0");
const calculatorElement = ref(null);

const emit = defineEmits(["dataReady"]);

defineExpose({
  calculatorDisplayValue,
  prefillDisplayValue,
});

onMounted(() => {
  const calculatorWidth = calculatorElement.value.clientWidth;
  calculatorElement.value.style.height = `${calculatorWidth}px`;
});

function prefillDisplayValue(number) {
  calculatorDisplayValue.value = number;
  noNumberInCalculator = false;
}

function appendNumber(number) {
  navigator.vibrate(40);
  if (noNumberInCalculator) {
    calculatorDisplayValue.value = "";
    noNumberInCalculator = false;
  }
  //need to fix the starting . WHen start with dot only
  const regex = /^\d+\.\d{2}$/;
  if (regex.test(calculatorDisplayValue.value)) {
    return;
  }
  if (number == "." && calculatorDisplayValue.value == "") {
    calculatorDisplayValue.value = "0.";
  }
  if (number == "." && calculatorDisplayValue.value.includes(".")) {
    return;
  }
  if (number == "0" && calculatorDisplayValue.value == "0") {
    return;
  }
  if (calculatorDisplayValue.value == "0") {
    calculatorDisplayValue.value = number;
    return;
  }
  calculatorDisplayValue.value = calculatorDisplayValue.value + number;
}

function clearNumber() {
  noNumberInCalculator = true;
  calculatorDisplayValue.value = "0";
}

function sendingCalculatorValue() {
  if (
    calculatorDisplayValue.value == "" ||
    parseFloat(calculatorDisplayValue.value) == 0
  ) {
    return;
  }
  console.log(
    "calculator value is ",
    parseFloat(calculatorDisplayValue.value).toFixed(2)
  );
  emit("dataReady", calculatorDisplayValue.value);
}
</script>

<style scoped>
.calculator-wrapper {
}

.calculator-keys-wrapper {
  min-height: 300px;
  padding: 1rem;
}

.calculator-keys {
  display: grid;
  margin: 0 auto;
  row-gap: 3.33%;
  column-gap: 3.33%;
  grid-template-columns: 22.5% 22.5% 22.5% 22.5%;
  grid-template-rows: 22.5% 22.5% 22.5% 22.5%;
  justify-content: center;
  align-content: center;
}
.number {
  display: grid;
  align-content: center;
  font-size: 2rem;
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
