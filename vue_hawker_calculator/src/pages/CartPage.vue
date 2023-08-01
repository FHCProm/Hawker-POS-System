<template>
  <div class="cartPage">
    <div class="header">
      <div class="header-word">结账</div>
      <div class="header-button-wrapper">
        <button class="header-button" @click="bookmarkTransaction">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="star-svg"
            :class="{ bookmarked: isBookmarked }"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </button>
        <button class="header-button" @click="router.push('/historyPage')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="history-svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      class="fruit-detail-category"
      v-for="category in Object.keys(sortedFruitTaken)"
    >
      {{ category }}
      <div
        class="fruit-detail"
        v-for="fruit in sortedFruitTaken[category]"
        :key="fruit"
        :class="{
          'fruit-detail-FadeIn': fruit.tradeId == route.params.newTradeId,
        }"
      >
        <div class="details-price-layout" @click="editFruit(fruit.tradeId)">
          <div class="name-gram-wrapper">
            <div class="fruit-name">{{ fruit.name }}</div>
            <div class="fruit-gram"></div>
            {{ fruit.measuredAmount }}{{ fruit.measurement }}
          </div>

          <div class="price-and-base">
            <div class="fruit-price">RM{{ fruit.total }}</div>
            <div class="base-price">
              RM{{ fruit.price }}/{{ fruit.measurement }}
            </div>
          </div>
        </div>
        <div class="delete-svg-layout" @click="removeFruit(fruit.tradeId)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="delete-svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>

    <router-link to="/fruits">
      <div class="plus-button-layout">
        <div class="plus-button-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
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
      <button
        class="primary-button-design collected-money"
        @click="calculatorVisibility = true"
      >
        收到的钱
      </button>
      <button
        class="primary-button-design next-person"
        @click="moveOnToNextTrade"
      >
        下一位
      </button>
    </div>

    <div class="calculate-change" v-if="mathematicDisplay">
      <div class="change-first-row-label">收到的钱：</div>
      <div class="change-first-row-value">{{ customerPaidAmount }}</div>
      <div class="change-second-row-label">水果价钱：</div>
      <div class="change-second-row-value">{{ totalPrice }}</div>
      <div class="minus-symbol">-</div>
      <div class="first-divider"></div>
      <div class="change-third-row-label">要找的钱:</div>
      <div class="change-third-row-value">{{ moneyToGiveBackToCustomer }}</div>
      <div class="second-divider"></div>
    </div>
    <calculatorModal
      v-if="calculatorVisibility"
      @data-ready="makeCalculatorInvisible"
    ></calculatorModal>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useFruitStore } from "../stores/fruits";
import calculatorModal from "../components/calculatorModal.vue";
import { useRouter, useRoute } from "vue-router";
import moment from "moment";
import { deepCopyArray } from "../utility/array-helper";
import androidFiles from "../config/androidFiles";
import { writeToFile } from "../utility/android-fs";

const fruitStore = useFruitStore();
const router = useRouter();
const route = useRoute();

// const totalPrice = ref("0");
// const moneyToGiveBackToCustomer = ref("0");
// const moneyToGiveBackVisibility = ref(false);
// const sortedFruitTaken = ref({});
// const filteredCategories = ref([]);
const calculatorVisibility = ref(false);
const customerPaidAmount = ref("0");
const isBookmarked = ref(false);
const transactionIdExists = ref(undefined);

onMounted(() => {
  // calculateTotal();
  // filterOutCategories();
  // createSortedFruitTakenBasedOnCategory();
});

const sortedFruitTaken = computed(() => {
  let fruitsObject = {};
  for (let i = 0; i < fruitStore.fruitsInCart.length; i++) {
    fruitsObject[fruitStore.fruitsInCart[i].category] = [];
  }
  for (const prop in fruitsObject) {
    for (let x = 0; x < fruitStore.fruitsInCart.length; x++) {
      if (fruitStore.fruitsInCart[x].category == prop) {
        fruitsObject[prop].push(fruitStore.fruitsInCart[x]);
      }
    }
  }
  return fruitsObject;
});

const totalPrice = computed(() => {
  let accumulatedTotal = 0;
  for (let i = 0; i < fruitStore.fruitsInCart.length; i++) {
    accumulatedTotal += parseFloat(fruitStore.fruitsInCart[i].total);
  }
  return accumulatedTotal.toFixed(2);
});

function makeCalculatorInvisible(data) {
  calculatorVisibility.value = false;
  customerPaidAmount.value = parseFloat(data).toFixed(2);
}

const moneyToGiveBackToCustomer = computed(() => {
  if (
    parseFloat(customerPaidAmount.value) > parseFloat(totalPrice.value) &&
    totalPrice.value != "0.00"
  ) {
    return (
      parseFloat(customerPaidAmount.value) - parseFloat(totalPrice.value)
    ).toFixed(2);
  } else {
    return "0.00";
  }
});

const mathematicDisplay = computed(() => {
  if (
    parseFloat(customerPaidAmount.value) > parseFloat(totalPrice.value) &&
    totalPrice.value != "0.00"
  ) {
    return true;
  } else {
    return false;
  }
});

function editFruit(tradeId) {
  router.push({
    name: "fruitDetail",
    params: { id: tradeId, pageBeforeThis: "Cart" },
  });
}

function removeFruit(tradeId) {
  let modifedFruitsInCart = [];

  for (let key in sortedFruitTaken.value) {
    for (let x = 0; x < sortedFruitTaken.value[key].length; x++) {
      modifedFruitsInCart.push({ ...sortedFruitTaken.value[key][x] });
    }
  }

  let indexToRemove = null;
  for (let i = 0; i < modifedFruitsInCart.length; i++) {
    if (modifedFruitsInCart[i].tradeId == tradeId) {
      indexToRemove = i;
    }
  }

  modifedFruitsInCart.splice(indexToRemove, 1);
  fruitStore.fruitsInCart = [...modifedFruitsInCart];
  writeToFile(
    JSON.stringify(fruitStore.fruitsInCart),
    androidFiles.FRUIT_IN_CART_PATH
  );
  // filterOutCategories();
  // createSortedFruitTakenBasedOnCategory();
  // calculateTotal();
}

function moveOnToNextTrade() {
  if (
    transactionIdExists.value == undefined &&
    fruitStore.fruitsInCart.length != 0
  ) {
    fruitStore.tradeHistory.push({
      transactionId: moment().valueOf(),
      bookmarked: false,
      total: totalPrice.value,
      fruits: deepCopyArray(fruitStore.fruitsInCart),
    });
    writeToFile(
      JSON.stringify(fruitStore.tradeHistory),
      androidFiles.FRUIT_HISTORY
    );
  }
  fruitStore.fruitsInCart = [];

  writeToFile(
    JSON.stringify(fruitStore.fruitsInCart),
    androidFiles.FRUIT_IN_CART_PATH
  );
}

function bookmarkTransaction() {
  isBookmarked.value = !isBookmarked.value;

  if (fruitStore.fruitsInCart.length != 0) {
    if (isBookmarked.value) {
      let transactionTime = moment().valueOf();
      transactionIdExists.value = transactionTime;

      fruitStore.tradeHistory.push({
        transactionId: transactionTime,
        bookmarked: true,
        total: totalPrice.value,
        fruits: deepCopyArray(fruitStore.fruitsInCart),
      });
    }

    if (isBookmarked.value == false) {
      let indexToRemove = undefined;
      for (let i = 0; i < fruitStore.tradeHistory.length; i++) {
        if (
          transactionIdExists.value == fruitStore.tradeHistory[i].transactionId
        ) {
          indexToRemove = i;
        }
      }
      fruitStore.tradeHistory.splice(indexToRemove, 1);

      transactionIdExists.value = undefined;
    }
    writeToFile(
      JSON.stringify(fruitStore.tradeHistory),
      androidFiles.FRUIT_HISTORY
    );
  }
}
</script>

<style scoped>
.header {
  display: flex;
  padding-left: 1rem;
  font-size: 2rem;
  width: 100%;
  height: 80px;
  margin-bottom: 1rem;
  color: rgb(121, 120, 118);
  justify-content: space-between;
  align-items: center;
}

.header-word {
}

.header-button-wrapper {
  display: flex;
  height: 100%;
}
.header-button {
  border: none;
  background: none;
  padding: 0 10px;
}
.star-svg {
  width: 30px;
  height: 30px;
  fill: gray;
}
.bookmarked {
  fill: rgb(252, 198, 2);
}
.history-svg {
  width: 30px;
  height: 30px;
  stroke: gray;
}

.fruit-detail-category {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 1rem;
}

.fruit-detail {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0.5rem;
  align-items: center;
  border-bottom: 1px solid rgb(196, 194, 194);
}

.fruit-detail-FadeIn {
  animation: fadeIn 1.5s forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.details-price-layout {
  display: flex;
  flex: 1;
  align-items: center;
}
.name-gram-wrapper {
  display: flex;
  align-items: baseline;
}
.fruit-name {
  font-size: 1.5rem;
  padding-right: 10px;
}

.fruit-gram {
  font-size: 1rem;
}

.price-and-base {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-end;
}

.fruit-price {
  font-size: 1.4rem;
}

.base-price {
  font-size: 0.7rem;
  font-style: italic;
  color: gray;
}

.delete-svg-layout {
  padding: 0 10px;
}
.delete-svg {
  width: 30px;
  stroke: red;
  height: 30px;
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
  background: rgb(193, 241, 110);
  align-items: center;
  border-radius: 10px;
  justify-items: center;
}
.plus-button {
  height: 2rem;
  color: black;
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
  margin-bottom: 1rem;
}

.collected-money {
  background: rgb(241, 110, 110);
  flex: 1;
  margin: 0 1rem;
}
.next-person {
  background: rgb(193, 241, 110);
  flex: 1;
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
  margin-bottom: 2rem;
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
