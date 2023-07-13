<template>
  <div class="popup" :class="{ isShown: popUpVisibility }" ref="popUpElement">
    <label class="pop-up-label" for="fruitName">水果名:</label>
    <input
      class="input-design"
      type="text"
      id="fruitName"
      v-model="fruitName"
      name="fruitName"
    />
    <label class="pop-up-label" for="fruitPrice">价格:</label>
    <div class="price">
      <input
        class="input-design price-input-design"
        type="text"
        id="fruitPrice"
        v-model="fruitPrice"
        name="fruitPrice"
      />
    </div>

    <div class="button-wrapper">
      <button class="cancel-button-design" @click="cancel">取消</button>
      <button class="primary-button-design" @click="saveFields">收藏</button>
    </div>
  </div>
  <div class="backdrop" :class="{ isShown: popUpVisibility }"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const popUpElement = ref(null);
const popUpVisibility = ref(false);
const fruitName = ref("");
const fruitPrice = ref("");

defineExpose({
  popUpVisibility,
});
onMounted(() => {
  popUpVisibility.value = false;
});

function saveFields() {
  console.log(fruitName.value, "  ", fruitPrice.value);
  //   var field1 = document.getElementById("field1").value;
  //   var field2 = document.getElementById("field2").value;
  // Do something with the fields here
  //   var popup = document.querySelector(".popup");

  popUpVisibility.value = false;
}

function cancel() {
  popUpVisibility.value = false;
}
</script>

<style scoped>
.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  display: none;
}

.backdrop {
  position: absolute;
  display: none;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 0;
  background: rgba(133, 131, 131, 0.463);
  animation: blur 1s ease-in-out forwards;
}

@keyframes blur {
  from {
    backdrop-filter: blur(0px);
  }
  to {
    backdrop-filter: blur(5px);
  }
}
.isShown {
  display: unset;
}

.pop-up-label {
  display: block;
  margin: 5px 0;
}

.input-design {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1.5rem;
  border: none;
  width: 300px;
  box-shadow: 2px 2px 6px #8a8b8b;
}
.input-design:focus {
  outline: none;
}

.price {
  position: relative;
}
.price::before {
  content: "RM";
  color: black;
  position: absolute;
  display: grid;
  height: 100%;
  left: 5px;
  z-index: 10;
  align-content: center;
}

.price-input-design {
  padding-left: 2rem;
  direction: rtl;
}

.button-wrapper {
  display: flex;
  margin-top: 2rem;
  justify-content: space-between;
}
</style>
