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
      <div class="price-layout">
        <div class="price">
          <input
            class="price-input-design"
            type="number"
            id="fruitPrice"
            v-model="fruitPrice"
            name="fruitPrice"
          />
        </div>
        <div class="price-measurement">
          <div class="measurement-slash">/</div>
          <div
            class="measurement-dropdown"
            @click="measurementDropdownSelected = !measurementDropdownSelected"
          >
            {{ currentSelectedMeasurementDropdownCategory }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="chevron-up-svg"
              :class="{ rotate: measurementDropdownSelected }"
            >
              <path
                fill-rule="evenodd"
                d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
                clip-rule="evenodd"
              />
            </svg>
            <div
              class="measurement-dropDown-selection"
              v-if="measurementDropdownSelected"
            >
              <div
                v-for="measurementCategory in measurementDropdownSelection"
                :key="measurementCategory"
                class="measurement-choice"
                @click.stop="
                  categoryChanged('measurement', measurementCategory)
                "
              >
                {{ measurementCategory }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <label class="category-dropdown-label pop-up-label">组:</label>

      <div
        @click="groupDropdownSelected = !groupDropdownSelected"
        class="category-dropdown-selected input-design"
      >
        <div>{{ currentSelectedGroupDropdownCateogry }}</div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="chevron-up-svg"
            :class="{ rotate: groupDropdownSelected }"
          >
            <path
              fill-rule="evenodd"
              d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div class="dropdown-selection" v-if="groupDropdownSelected">
        <div
          v-for="selection in groupDropdownSelection"
          :key="selection"
          class="single-dropdown-selection"
          @click="categoryChanged('group', selection)"
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
import { writeToFile } from "../utility/android-fs";

const popUpElement = ref(null);
const popUpVisibility = ref(false);
const fruitName = ref("");
const fruitPrice = ref("");
const fruitStore = useFruitStore();

const groupDropdownSelected = ref(false);
const groupDropdownSelection = ref([]);
const currentSelectedGroupDropdownCateogry = ref("普通");

const measurementDropdownSelected = ref(false);
const measurementDropdownSelection = ref([]);
const currentSelectedMeasurementDropdownCategory = ref("kg");

let selectedFruitId = ref(null);
let fieldsIncorrect = ref(false);

const emit = defineEmits(["readyForReload"]);

defineExpose({
  popUpVisibility,
  selectedFruitId,
  fillUpFields,
});
onMounted(() => {
  popUpVisibility.value = false;
});

function reloadDropdownCategory() {
  groupDropdownSelection.value = [];
  measurementDropdownSelection.value = [];
  for (let i = 0; i < fruitStore.saleCategories.length; i++) {
    if (
      currentSelectedGroupDropdownCateogry.value != fruitStore.saleCategories[i]
    ) {
      groupDropdownSelection.value.push(fruitStore.saleCategories[i]);
    }
  }

  for (let i = 0; i < fruitStore.measurementCategory.length; i++) {
    if (
      currentSelectedMeasurementDropdownCategory.value !=
      fruitStore.measurementCategory[i]
    ) {
      measurementDropdownSelection.value.push(
        fruitStore.measurementCategory[i]
      );
    }
  }
}

function categoryChanged(dropdownName, selection) {
  if (dropdownName == "group") {
    currentSelectedGroupDropdownCateogry.value = selection;
    groupDropdownSelected.value = false;
    reloadDropdownCategory();
  }

  if (dropdownName == "measurement") {
    currentSelectedMeasurementDropdownCategory.value = selection;
    measurementDropdownSelected.value = false;
    reloadDropdownCategory();
  }
}

function fillUpFields() {
  fieldsIncorrect.value = false;
  refreshFieldsToDefault();
  reloadDropdownCategory();
  if (selectedFruitId.value == undefined) {
    return;
  }
  for (let i = 0; i < fruitStore.fruitsForSale.length; i++) {
    if (fruitStore.fruitsForSale[i].id == selectedFruitId.value) {
      fruitName.value = fruitStore.fruitsForSale[i].name;
      fruitPrice.value = fruitStore.fruitsForSale[i].price;
      currentSelectedGroupDropdownCateogry.value =
        fruitStore.fruitsForSale[i].category;
      currentSelectedMeasurementDropdownCategory.value =
        fruitStore.fruitsForSale[i].measurement;
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
  if (selectedFruitId.value == undefined) {
    let date = new Date();
    let newFruit = {
      id: date.getTime(),
      name: fruitName.value,
      price: parseFloat(fruitPrice.value).toFixed(2),
      measurement: currentSelectedMeasurementDropdownCategory.value,
      category: currentSelectedGroupDropdownCateogry.value,
    };
    fruitStore.fruitsForSale.push(newFruit);
  }

  if (selectedFruitId.value != undefined) {
    for (let i = 0; i < fruitStore.fruitsForSale.length; i++) {
      if (fruitStore.fruitsForSale[i].id == selectedFruitId.value) {
        fruitStore.fruitsForSale[i].name = fruitName.value;
        fruitStore.fruitsForSale[i].price = parseFloat(
          fruitPrice.value
        ).toFixed(2);
        fruitStore.fruitsForSale[i].category =
          currentSelectedGroupDropdownCateogry.value;
        fruitStore.fruitsForSale[i].measurement =
          currentSelectedMeasurementDropdownCategory.value;
      }
    }
  }
  writeToFile(JSON.stringify(fruitStore.fruitsForSale));
  emit("readyForReload");

  popUpVisibility.value = false;
}

function cancel() {
  popUpVisibility.value = false;
}

function refreshFieldsToDefault() {
  fruitName.value = "";
  fruitPrice.value = "";
  currentSelectedGroupDropdownCateogry.value = "普通";
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
  box-shadow: 1px 1px 3px #555555;
}

.price-layout {
  display: flex;
  width: 300px;
}
.price {
  flex: 1;
  position: relative;
}
.price::before {
  content: "RM";
  color: black;
  position: absolute;
  display: grid;
  height: 100%;
  z-index: 10;
  left: 5px;
  align-content: center;
}

.price-input-design {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-right: 1rem;
  padding-left: 3rem;
  border-radius: 5px;
  font-size: 1.2rem;
  border: none;
  width: 180px;
  box-shadow: 1px 1px 3px #555555;
}

.price-measurement {
  display: flex;
  flex: 3;
  font-size: 1.2rem;
  width: min-content;
}

.measurement-slash {
  padding: 0 5px;
  font-size: 1.8rem;
  margin: auto;
  flex: 1;
  display: flex;
  justify-content: center;
}
.measurement-dropdown {
  flex: 2;
  position: relative;
  width: 50px;
  border-radius: 5px;
  box-shadow: 1px 1px 3px #555555;
  padding-left: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
}

.measurement-dropDown-selection {
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  z-index: 10;
  background: rgb(221, 221, 221);
}
.measurement-choice {
  width: 100%;
  padding: 0.3rem 0.3rem;
  border-radius: 5px;
  border: 1px solid rgb(111, 110, 110);
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
  background: rgb(221, 221, 221);
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
