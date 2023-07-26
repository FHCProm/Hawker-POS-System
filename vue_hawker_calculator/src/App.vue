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

  // const script = document.createElement("script");
  // script.src = "cordova.js";
  // document.body.appendChild(script);
});

// document.addEventListener("deviceready", onDeviceReady, false);
// function onDeviceReady() {
//   readFromFile((variable) => {
//     fruitStore.fruitsForSale = variable;
//     fruitStore.dataIsLoadedFromFiles = true;
//   });

//   console.log("device is ready");
// }
</script>

<style scoped></style>
