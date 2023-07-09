<template>
  <div class="header">
    <BackButton back-path="/"></BackButton>
    <div>輸入水果重量</div>
  </div>
  <div class="fruit-detail">
    <div class="fruit-name">木瓜</div>
    <div class="fruit-price-wrapper">
      <div class="price-RM">RM</div>
      <div class="price-number">11.5</div>
      <div class="price-KG">/kg</div>
    </div>
  </div>
  <div class="input-wrapper">
    <input
      disabled
      class="gram-input-design"
      type="number"
      id="kilogram"
      name="kilogram"
      v-model="fruitKilogram"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import BackButton from "../components/BackButton.vue";

const fruitKilogram = ref(0);
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

.fruit-detail {
  display: flex;
  align-items: center;
  height: 200px;
  background: rgb(144, 197, 235);
  margin: 0 0.5rem;
  margin-bottom: 0.5rem;
}
.fruit-name {
  flex: 1;
  font-size: 4rem;
  text-align: center;
}
.fruit-price-wrapper {
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.price-number {
  font-size: 3rem;
}

.price-RM {
  font-size: 1rem;
}
.price-KG {
  font-size: 1.5rem;
}

.input-wrapper {
  position: relative;
  padding: 0 0.5rem;
  width: 100%;
}
.gram-input-design {
  height: 60px;
  width: 100%;
  direction: rtl;
  font-size: 2rem;
  padding-right: 50px;
  outline: none;
  border: none;
  box-shadow: 2px 2px 6px #8a8b8b;
}
</style>
