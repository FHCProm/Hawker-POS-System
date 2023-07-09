<template>
  <router-link class="button-wrapper" :to="backPath">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="back-button"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
      />
    </svg>
  </router-link>
</template>

<script setup>
const props = defineProps({
  backPath: {
    required: true,
  },
});
</script>

<style scoped>
.button-wrapper {
  height: 100%;
  display: grid;
  align-content: center;
}
.back-button {
  width: 40px;
  height: 40px;
  color: #f48b02;
  margin-right: 20px;
}
</style>
