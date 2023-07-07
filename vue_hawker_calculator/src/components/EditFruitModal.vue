<template>
  <div :style="{ display: popUpVisibility }" class="popup" ref="popUpElement">
    <label for="fruitName">水果名:</label><br />
    <input
      type="text"
      id="fruitName"
      v-model="fruitName"
      name="fruitName"
    /><br />
    <label for="fruitPrice">价格:</label><br />
    <input
      type="text"
      id="fruitPrice"
      v-model="fruitPrice"
      name="fruitPrice"
    /><br /><br />
    <button @click="saveFields">Save</button>
    <button @click="cancel">Cancel</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const popUpElement = ref(null);
const popUpVisibility = ref("none");
const fruitName = ref("");
const fruitPrice = ref("");

defineExpose({
  popUpVisibility,
});
onMounted(() => {
  popUpVisibility.value = "none";
});

function saveFields() {
  console.log(fruitName.value, "  ", fruitPrice.value);
  //   var field1 = document.getElementById("field1").value;
  //   var field2 = document.getElementById("field2").value;
  // Do something with the fields here
  //   var popup = document.querySelector(".popup");
  //   popup.style.display = "none";
}

function cancel() {
  popUpVisibility.value = "none";
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
}
</style>
