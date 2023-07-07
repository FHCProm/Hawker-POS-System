<template>
  <div class="header">选择水果</div>
  <div class="table-header">
    <div class="table-header-one">水果</div>
    <div class="table-header-two">RM/kg</div>
  </div>
  <div
    @click="changePopUpVisibility"
    class="fruit-details-wrapper"
    v-for="fruit in fruits"
    :key="fruit"
  >
    <div class="fruit-name">{{ fruit.name }}</div>
    <div class="fruit-price">{{ fruit.price }}</div>
  </div>

  <EditFruitModal ref="popUpModal"></EditFruitModal>
</template>

<script setup>
import { ref } from "vue";
import EditFruitModal from "../components/EditFruitModal.vue";
import { useFruitStore } from "../stores/fruits";

const fruitStore = useFruitStore();
const fruits = fruitStore.fruitsForSale;
const popUpModal = ref(null);

function changePopUpVisibility() {
  popUpModal.value.popUpVisibility = "unset";
}
</script>

<style scoped>
.header {
  padding: 1rem 0;
  background: rgb(249, 186, 118);
  width: 100%;
  text-align: center;
}

.table-header {
  margin: 0 0.5rem;
  display: flex;
  font-size: 1rem;
}
.table-header-one {
  flex: 2;
  padding: 0.5rem 1rem;
}
.table-header-two {
  flex: 1;
  padding: 1rem 0;
}

.fruit-details-wrapper {
  margin: 0 0.5rem;
  display: flex;
  font-size: 1.3rem;
  border-bottom: 0.8px solid black;
}

.fruit-name {
  padding: 1rem 1rem;
  flex: 2;
}
.fruit-price {
  flex: 1;
  padding: 1rem 0;
}
</style>
