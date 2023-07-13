<template>
  <div class="popup">
    <div class="calculator-wrapper">
      <div class="calculator-display">
        <div class="RM-label">RM</div>
        <div class="RM-value">{{ buyerPaidAmount }}</div>
      </div>
      <div class="calculator-keys-wrapper">
        <div class="calculator-keys" ref="calculator">
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
          <div class="number number-enter" @click="finalizeBuyerPaidAmount">
            确认
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="backdrop"></div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from "vue";

let noNumberInCalculator = true;
const buyerPaidAmount = ref("0");
const calculator = ref(null);

const emit = defineEmits(["closeModal"]);

onMounted(() => {
  const calculatorWidth = calculator.value.clientWidth;
  calculator.value.style.height = `${calculatorWidth}px`;
});

function appendNumber(number) {
  if (noNumberInCalculator) {
    buyerPaidAmount.value = "";
    noNumberInCalculator = false;
  }
  //need to fix the starting . WHen start with dot only
  const regex = /^\d+\.\d{2}$/;
  if (regex.test(buyerPaidAmount.value)) {
    return;
  }
  if (number == "." && buyerPaidAmount.value == "") {
    buyerPaidAmount.value = "0.";
  }
  if (number == "." && buyerPaidAmount.value.includes(".")) {
    return;
  }
  if (number == "0" && buyerPaidAmount.value == "0") {
    return;
  }
  if (buyerPaidAmount.value == "0") {
    buyerPaidAmount.value = number;
    return;
  }
  buyerPaidAmount.value = buyerPaidAmount.value + number;
}

function clearNumber() {
  noNumberInCalculator = true;
  buyerPaidAmount.value = "0";
}

function finalizeBuyerPaidAmount() {
  if (buyerPaidAmount.value == "" || parseFloat(buyerPaidAmount.value) == 0) {
    return;
  }
  console.log("buyer paid amount is", buyerPaidAmount.value);
  emit("closeModal", false);

  //   const priceOfGood = (
  //     parseFloat(buyerPaidAmount.value) * parseFloat(fruitPrice)
  //   ).toFixed(2);
}
</script>

<style scoped>
.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 80%;
  max-width: 500px;
}

.calculator-wrapper {
}
.calculator-display {
  display: flex;
  position: relative;
  padding: 1rem;
  margin: 0 1rem;
  margin-top: 1rem;
  justify-content: space-between;
  box-shadow: inset 2px 2px 6px #8a8b8b;
  align-items: baseline;
  background: rgb(163, 178, 163);
}
.RM-label {
  font-size: 1rem;
}

.RM-value {
  font-size: 1.5rem;
}
.calculator-keys-wrapper {
  min-height: 300px;
  padding: 1rem;
}

.calculator-keys {
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

.backdrop {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 0;
  background: rgba(133, 131, 131, 0.463);
  animation: blur 1s ease-in-out forwards;
}

@keyframes blur {
  from {
    backdrop-filter: blur(0px);
  }
  to {
    backdrop-filter: blur(5px);
  }
}
</style>
