<template>
  <div class="header">
    <BackButton back-path="/"></BackButton>
    <div>选择要更改的水果</div>
  </div>

  <div class="add-button-wrapper">
    <button
      class="add-button primary-button-design"
      @click="changePopUpVisibility()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="add-svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  </div>
  <div
    class="fruit-spec-layout"
    v-for="category in Object.keys(TableData)"
    :key="category"
  >
    <div class="fruit-category">
      <div class="category-word">{{ category }}</div>
      <div class="black-line"></div>
    </div>
    <div class="fruit-specs" v-for="fruit in TableData[category]" :key="fruit">
      <div class="name-price-layout" @click="changePopUpVisibility(fruit.id)">
        <div class="fruit-name">{{ fruit.name }}</div>
        <div class="fruit-price">
          RM{{ fruit.price }}/{{ fruit.measurement }}
        </div>
      </div>
      <div class="delete-svg-layout" @click="confirmUserAction(fruit.id)">
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

  <EditFruitModal ref="popUpModal"></EditFruitModal>
  <ConfirmationBox
    v-if="confirmationBoxVisibility"
    @confirmation-done="deleteFruit"
  ></ConfirmationBox>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import EditFruitModal from "../components/EditFruitModal.vue";
import { useFruitStore } from "../stores/fruits";
import BackButton from "../components/BackButton.vue";
import ConfirmationBox from "../components/ConfirmationBox.vue";

const fruitStore = useFruitStore();
const popUpModal = ref(null);
const confirmationBoxVisibility = ref(false);

let dataForTheTable = ref({});
let categoryForTheTable = ref([]);
let selectedIdForConfirmationBox = ref(null);

onMounted(() => {});

const TableData = computed(() => {
  let data = {};
  for (let i = 0; i < fruitStore.saleCategories.length; i++) {
    data[fruitStore.saleCategories[i]] = [];
    for (let x = 0; x < fruitStore.fruitsForSale.length; x++) {
      if (
        fruitStore.fruitsForSale[x].category == fruitStore.saleCategories[i]
      ) {
        data[fruitStore.saleCategories[i]].push(fruitStore.fruitsForSale[x]);
      }
    }
  }
  let filteredData = {};
  for (let prop in data) {
    if (data[prop].length > 0) {
      filteredData[prop] = data[prop];
    }
  }
  return filteredData;
});

function changePopUpVisibility(id) {
  popUpModal.value.selectedFruitId = id;
  popUpModal.value.fillUpFields();
  popUpModal.value.popUpVisibility = true;
}

function confirmUserAction(id) {
  selectedIdForConfirmationBox.value = id;
  confirmationBoxVisibility.value = true;
}

function deleteFruit(decision) {
  confirmationBoxVisibility.value = false;
  if (decision) {
    let indexToRemove = undefined;

    for (let i = 0; i < fruitStore.fruitsForSale.length; i++) {
      if (
        fruitStore.fruitsForSale[i].id == selectedIdForConfirmationBox.value
      ) {
        indexToRemove = i;
      }
    }
    fruitStore.fruitsForSale.splice(indexToRemove, 1);
  }
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

.fruit-spec-layout {
  margin-top: 1rem;
}
.fruit-category {
  display: flex;
  margin: 0 1rem;

  align-items: center;
}
.category-word {
  padding-right: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
}
.black-line {
  background: rgb(143, 140, 140);
  height: 1px;
  flex: 1;
}

.fruit-specs {
  margin: 1rem 1rem;
  display: flex;

  font-size: 1.3rem;
  box-shadow: 4px 4px 6px #d2d3d4, -4px -4px 6px #ffffff, -2px -2px 6px #d2d3d4,
    -4px -4px 6px #ffffff;
}

.name-price-layout {
  display: flex;
  flex: 1;
}

.fruit-name {
  padding: 1rem 1rem;
  flex: 1;
}
.fruit-price {
  flex: 1;
  margin: auto;
}

.add-button-wrapper {
  display: flex;
  width: 100%;
  padding-right: 1rem;
  justify-content: flex-end;
}

.add-button {
  display: flex;
  width: min-content;
  align-items: center;
  padding: 0 1rem;
}

.add-svg {
  height: 30px;
  width: 30px;
}
.delete-svg-layout {
  padding: 0 10px;
  margin: auto;
}
.delete-svg {
  width: 30px;
  stroke: red;
  height: 30px;
}
</style>
