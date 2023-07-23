<template>
  <RouterView></RouterView>
</template>

<script setup>
import { onMounted } from "vue";
window.screen.orientation.lock("portrait");

onMounted(() => {});
</script>

<style scoped></style>
