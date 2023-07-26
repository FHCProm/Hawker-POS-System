<template>
  <RouterView></RouterView>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { readFromFile } from "./utility/android-fs";
import { useFruitStore } from "./stores/fruits";

const fruitStore = useFruitStore();

onMounted(() => {
  screen.orientation.lock("portrait");
});

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  readFromFile((variable) => {
    fruitStore.fruitsForSale = variable;
    fruitStore.dataIsLoadedFromFiles = true;
  });
}
</script>

<style scoped></style>
