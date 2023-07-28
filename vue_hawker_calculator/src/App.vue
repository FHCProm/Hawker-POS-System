<template>
  <RouterView></RouterView>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { readFromFile } from "./utility/android-fs";
import { useFruitStore } from "./stores/fruits";
import androidFiles from "./config/androidFiles";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const fruitStore = useFruitStore();

onMounted(() => {
  const auth = getAuth();

  signInWithEmailAndPassword(auth, "fhcprogamer999@gmail.com", "123456")
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user.email, "has signed in");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  screen.orientation.lock("portrait");

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
