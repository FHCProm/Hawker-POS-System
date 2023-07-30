<template>
  <RouterView></RouterView>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { readFromFile, writeToFile } from "./utility/android-fs";
import { useFruitStore } from "./stores/fruits";
import androidFiles from "./config/androidFiles";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import moment from "moment";

const router = useRouter();
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
  readFromFile((variable) => {
    fruitStore.fruitsForSale = variable;
  }, androidFiles.FRUIT_FOR_SALE_PATH);

  readFromFile((variable) => {
    fruitStore.fruitsInCart = variable;
  }, androidFiles.FRUIT_IN_CART_PATH);

  readFromFile((variable) => {
    fruitStore.tradeHistory = variable;
    let removedOlderHistory = [];
    for (let i = 0; i < fruitStore.tradeHistory.length; i++) {
      let dateOfHistory = moment(fruitStore.tradeHistory[i].transactionId);
      let isToday = moment().isSame(dateOfHistory, "day");
      if (isToday) {
        removedOlderHistory.push(fruitStore.tradeHistory[i]);
      }
    }
    fruitStore.tradeHistory = removedOlderHistory;
    writeToFile(
      JSON.stringify(fruitStore.tradeHistory),
      androidFiles.FRUIT_HISTORY
    );
  }, androidFiles.FRUIT_HISTORY);

  document.addEventListener(
    "backbutton",
    function (evt) {
      if (window.location.href !== "https://localhost/index.html#/") {
        router.push({ name: "home" });
      } else {
        console.log(window.plugins);
        window.plugins.appMinimize.minimize();
      }
    },
    false
  );
}
</script>

<style scoped></style>
