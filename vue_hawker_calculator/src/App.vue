<template>
  <RouterView></RouterView>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { readFromFile } from "./utility/android-fs";
import { useFruitStore } from "./stores/fruits";
import androidFiles from "./config/androidFiles";

const fruitStore = useFruitStore();

onMounted(() => {
  screen.orientation.lock("portrait");
});

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  readFromFile((variable) => {
    fruitStore.fruitsForSale = variable;
  }, androidFiles.FRUIT_FOR_SALE_PATH);

  readFromFile((variable) => {
    fruitStore.fruitsInCart = variable;
  }, androidFiles.FRUIT_IN_CART_PATH);

  readFromFile((variable) => {
    fruitStore.tradeHistory = variable;
  }, androidFiles.FRUIT_HISTORY);
}
</script>

<style scoped></style>
