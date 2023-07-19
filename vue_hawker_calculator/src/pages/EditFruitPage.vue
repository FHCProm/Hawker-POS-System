<template>
  <div class="header">
    <BackButton back-path="/"></BackButton>
    <div>选择要更改的水果</div>
  </div>

  <div class="add-button-wrapper">
    <button class="add-button primary-button-design">
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
    v-for="category in categoryForTheTable"
    :key="category"
  >
    <div class="fruit-category">
      <div class="category-word">{{ category }}</div>
      <div class="black-line"></div>
    </div>
    <div
      class="fruit-specs"
      v-for="fruit in dataForTheTable[category]"
      :key="fruit"
      @click="changePopUpVisibility(fruit.id)"
    >
      <div class="fruit-name">{{ fruit.name }}</div>
      <div class="fruit-price">RM{{ fruit.price }}</div>
    </div>
  </div>

  <EditFruitModal ref="popUpModal"></EditFruitModal>
</template>

<script setup>
import { ref } from "vue";
import EditFruitModal from "../components/EditFruitModal.vue";
import { useFruitStore } from "../stores/fruits";
import BackButton from "../components/BackButton.vue";

const fruitStore = useFruitStore();
const popUpModal = ref(null);

let dataForTheTable = ref({});
let categoryForTheTable = ref([]);
for (let i = 0; i < fruitStore.saleCategories.length; i++) {
  dataForTheTable.value[fruitStore.saleCategories[i]] = [];
  for (let x = 0; x < fruitStore.fruitsForSale.length; x++) {
    if (fruitStore.fruitsForSale[x].category == fruitStore.saleCategories[i])
      dataForTheTable.value[fruitStore.saleCategories[i]].push(
        fruitStore.fruitsForSale[x]
      );
  }
}

for (let i = 0; i < fruitStore.saleCategories.length; i++) {
  if (dataForTheTable.value[fruitStore.saleCategories[i]].length > 0) {
    categoryForTheTable.value.push(fruitStore.saleCategories[i]);
  }
}

function changePopUpVisibility(id) {
  popUpModal.value.selectedFruitId = id;
  popUpModal.value.fillUpFields();
  popUpModal.value.popUpVisibility = true;
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

.fruit-name {
  padding: 1rem 1rem;
  flex: 2;
}
.fruit-price {
  flex: 1;
  padding: 1rem 0;
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
</style>
