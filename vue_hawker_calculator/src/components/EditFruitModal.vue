<template>
  <div
    class="edit-fruit-modal-container"
    :class="{ modalIsShown: popUpVisibility }"
  >
    <div class="popup" ref="popUpElement">
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
      <label class="category-dropdown-label pop-up-label">组:</label>

      <div
        @click="dropdownSelected = !dropdownSelected"
        class="category-dropdown-selected input-design"
      >
        <div>{{ currentSelectedCateogry }}</div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="chevron-up-svg"
            :class="{ rotate: dropdownSelected }"
          >
            <path
              fill-rule="evenodd"
              d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div class="dropdown-selection" v-if="dropdownSelected">
        <div
          v-for="selection in dropdownSelection"
          :key="selection"
          class="single-dropdown-selection"
          @click="categoryChanged(selection)"
        >
          {{ selection }}
        </div>
      </div>
      <div class="warning-text" v-if="fieldsIncorrect">
        fields are not allowed to be empty
      </div>

      <div class="button-wrapper">
        <button class="cancel-button-design" @click="cancel">取消</button>
        <button class="primary-button-design save-button" @click="saveFields">
          收藏
        </button>
      </div>
    </div>
  </div>
  <div class="backdrop" :class="{ isShown: popUpVisibility }"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useFruitStore } from "../stores/fruits";

const popUpElement = ref(null);
const popUpVisibility = ref(false);
const fruitName = ref("");
const fruitPrice = ref("");
const fruitStore = useFruitStore();

const dropdownSelected = ref(false);
const dropdownSelection = ref([]);
const currentSelectedCateogry = ref("普通");

let selectedFruitId = ref(null);
let fieldsIncorrect = ref(false);

defineExpose({
  popUpVisibility,
  selectedFruitId,
  fillUpFields,
});
onMounted(() => {
  popUpVisibility.value = false;
  reloadDropdownCategory();
});

function reloadDropdownCategory() {
  dropdownSelection.value = [];
  for (let i = 0; i < fruitStore.saleCategories.length; i++) {
    if (currentSelectedCateogry.value != fruitStore.saleCategories[i]) {
      dropdownSelection.value.push(fruitStore.saleCategories[i]);
    }
  }
}

function categoryChanged(selection) {
  currentSelectedCateogry.value = selection;
  dropdownSelected.value = false;
  reloadDropdownCategory();
}

function fillUpFields() {
  fieldsIncorrect.value = false;
  for (let i = 0; i < fruitStore.fruitsForSale.length; i++) {
    if (fruitStore.fruitsForSale[i].id == selectedFruitId.value) {
      fruitName.value = fruitStore.fruitsForSale[i].name;
      fruitPrice.value = fruitStore.fruitsForSale[i].price;
      currentSelectedCateogry.value = fruitStore.fruitsForSale[i].category;
      reloadDropdownCategory();
      return;
    }
  }
}

function saveFields() {
  if (fruitName.value == "" || fruitPrice.value == "") {
    fieldsIncorrect.value = true;
    return;
  }

  for (let i = 0; i < fruitStore.fruitsForSale.length; i++) {
    if (fruitStore.fruitsForSale[i].id == selectedFruitId.value) {
      fruitStore.fruitsForSale[i].name = fruitName.value;
      fruitStore.fruitsForSale[i].price = fruitPrice.value;
      fruitStore.fruitsForSale[i].category = currentSelectedCateogry.value;
    }
  }

  popUpVisibility.value = false;
}

function cancel() {
  popUpVisibility.value = false;
}
</script>

<style scoped>
.edit-fruit-modal-container {
  overflow: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: none;
}
.popup {
  margin: auto;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  height: min-content;
  width: min-content;
}

.backdrop {
  position: absolute;
  display: none;
  right: 0;
  bottom: 0;
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

.modalIsShown {
  display: grid;
}

.pop-up-label {
  display: block;
  margin: 10px 0;
}

.input-design {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1.2rem;
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

.category-dropdown-selected {
  display: flex;
  justify-content: space-between;
}

.chevron-up-svg {
  width: 30px;
  height: 100%;
}

.rotate {
  transform: rotate(180deg);
}

.single-dropdown-selection {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1.2rem;
  border: 1px solid rgb(154, 153, 153);
  width: 300px;
}

.button-wrapper {
  display: flex;
  margin-top: 2rem;
  justify-content: space-between;
}

.warning-text {
  color: red;
}
.save-button {
  width: 5rem;
}
</style>
