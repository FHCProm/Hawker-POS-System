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
    @click="changePopUpVisibility"
    class="fruit-details"
    v-for="fruit in fruits"
    :key="fruit"
  >
    <div class="fruit-name">{{ fruit.name }}</div>
    <div class="fruit-price">RM{{ fruit.price }}</div>
  </div>

  <EditFruitModal ref="popUpModal"></EditFruitModal>
</template>

<script setup>
import { ref } from "vue";
import EditFruitModal from "../components/EditFruitModal.vue";
import { useFruitStore } from "../stores/fruits";
import BackButton from "../components/BackButton.vue";

const fruitStore = useFruitStore();
const fruits = fruitStore.fruitsForSale;
const popUpModal = ref(null);

function changePopUpVisibility() {
  popUpModal.value.popUpVisibility = "unset";
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

.fruit-details {
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
}

.add-svg {
  height: 30px;
  width: 30px;
}
</style>
