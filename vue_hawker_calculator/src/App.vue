<template>
  <RouterView></RouterView>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  screen.orientation.lock("portrait");

  const script = document.createElement("script");
  script.src = "cordova.js";
  document.body.appendChild(script);
});
</script>

<style scoped></style>
