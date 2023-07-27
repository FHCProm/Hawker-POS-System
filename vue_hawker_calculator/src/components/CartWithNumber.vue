<template>
  <router-link to="/cartPage/0">
    <div class="cart-svg-layout">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="cart-svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      <div
        class="cart-red-circle"
        :class="{ 'circle-hidden': cartIsEmpty }"
      ></div>
    </div>
  </router-link>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useFruitStore } from "../stores/fruits";
const fruitStore = useFruitStore();

// const cartIsEmpty = ref(true);
onMounted(() => {
  // if (fruitStore.fruitsInCart.length > 0) {
  //   cartIsEmpty.value = false;
  // }
});

const cartIsEmpty = computed(() => {
  if (fruitStore.fruitsInCart.length > 0) {
    return false;
  } else {
    return true;
  }
});
</script>

<style scoped>
.cart-svg-layout {
  position: relative;
  display: flex;
}
.cart-svg {
  width: 40px;
  height: 40px;
}
.cart-red-circle {
  position: absolute;
  top: 4px;
  left: 27px;
  width: 12px;
  height: 12px;
  background: red;
  border-radius: 100%;
}

.circle-hidden {
  display: none;
}
</style>
