<template>
  <div class="header">
    <BackButton back-path="/fruits"></BackButton>
    <div>选择要更改的水果</div>
  </div>

  <div class="top-button-wrapper">
    <div class="upload-status" :style="{ color: statusTextColor }">
      {{ uploadStatusText }}
    </div>

    <button
      class="upload-button"
      @click="cloudConfirmationBoxVisibility = true"
    >
      <svg
        v-if="!uploading"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="upload-svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
        />
      </svg>
      <div v-else class="spinner"></div>
    </button>

    <button class="download-button" @click="downloadFruitForSaleFromFirebase">
      <svg
        v-if="!downloading"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="cloud-svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
        />
      </svg>
      <div v-else class="spinner"></div>
    </button>
    <button
      class="add-button primary-button-design"
      @click="changePopUpVisibility()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="add-svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  </div>
  <div
    class="fruit-spec-layout"
    v-for="category in Object.keys(TableData)"
    :key="category"
  >
    <div class="fruit-category">
      <div class="category-word">{{ category }}</div>
      <div class="black-line"></div>
    </div>
    <div class="fruit-list" :class="`category-${category}`">
      <div
        class="fruit-specs"
        v-for="fruit in TableData[category]"
        :key="fruit"
        :data-id="fruit.id"
        @mouseenter="draggableEntered"
        @mouseleave="draggableLeave"
      >
        <div class="name-price-layout" @click="changePopUpVisibility(fruit.id)">
          <div class="fruit-name">{{ fruit.name }}</div>
          <div class="fruit-price">
            RM{{ fruit.price }}/{{ fruit.measurement }}
          </div>
        </div>
        <div class="delete-svg-layout" @click="confirmUserAction(fruit.id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="delete-svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>

  <EditFruitModal ref="popUpModal"></EditFruitModal>
  <ConfirmationBox
    v-if="confirmationBoxVisibility"
    @confirmation-done="deleteFruit"
  ></ConfirmationBox>

  <CloudConfirmationBox
    v-if="cloudConfirmationBoxVisibility"
    @confirmation-result="uploudFruitForSaleToFirebase"
  ></CloudConfirmationBox>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import EditFruitModal from "../components/EditFruitModal.vue";
import { useFruitStore } from "../stores/fruits";
import BackButton from "../components/BackButton.vue";
import ConfirmationBox from "../components/ConfirmationBox.vue";
import CloudConfirmationBox from "../components/CloudConfirmationBox.vue";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { writeToFile } from "../utility/android-fs";
import androidFiles from "../config/androidFiles";
import { Draggable } from "@shopify/draggable";

const fruitStore = useFruitStore();
const popUpModal = ref(null);
const confirmationBoxVisibility = ref(false);

let selectedIdForConfirmationBox = ref(null);

const uploading = ref(false);
const downloading = ref(false);
const cloudConfirmationBoxVisibility = ref(false);

const uploadStatusText = ref("");
const statusTextColor = ref("");

const isDragging = ref(false);
const draggableSrc = ref(undefined);
const draggableTarget = ref(undefined);

onMounted(() => {
  DraggableList();
});

const TableData = computed(() => {
  let data = {};
  for (let i = 0; i < fruitStore.saleCategories.length; i++) {
    data[fruitStore.saleCategories[i]] = [];
    for (let x = 0; x < fruitStore.fruitsForSale.length; x++) {
      if (
        fruitStore.fruitsForSale[x].category == fruitStore.saleCategories[i]
      ) {
        data[fruitStore.saleCategories[i]].push(fruitStore.fruitsForSale[x]);
      }
    }
  }
  let filteredData = {};
  for (let prop in data) {
    if (data[prop].length > 0) {
      filteredData[prop] = data[prop];
    }
  }
  return filteredData;
});

function changePopUpVisibility(id) {
  popUpModal.value.selectedFruitId = id;
  popUpModal.value.fillUpFields();
  popUpModal.value.popUpVisibility = true;
}

function confirmUserAction(id) {
  selectedIdForConfirmationBox.value = id;
  confirmationBoxVisibility.value = true;
}

function deleteFruit(decision) {
  confirmationBoxVisibility.value = false;
  if (decision) {
    let indexToRemove = undefined;

    for (let i = 0; i < fruitStore.fruitsForSale.length; i++) {
      if (
        fruitStore.fruitsForSale[i].id == selectedIdForConfirmationBox.value
      ) {
        indexToRemove = i;
      }
    }
    fruitStore.fruitsForSale.splice(indexToRemove, 1);
    writeToFile(
      JSON.stringify(fruitStore.fruitsForSale),
      androidFiles.FRUIT_FOR_SALE_PATH
    );
  }
}

async function uploudFruitForSaleToFirebase(boolean) {
  cloudConfirmationBoxVisibility.value = false;
  if (boolean) {
    uploading.value = true;
    const dataObject = {
      data: fruitStore.fruitsForSale,
    };

    await setDoc(
      doc(fruitStore.firestore, "fruit-store", "fruit-for-sale"),
      dataObject
    );
    uploading.value = false;
    statusTextColor.value = "green";
    uploadStatusText.value = "success";
    await delay(5000);
    uploadStatusText.value = "";

    console.log("finished uploading");
  }
}

async function downloadFruitForSaleFromFirebase() {
  downloading.value = true;

  const docRef = doc(fruitStore.firestore, "fruit-store", "fruit-for-sale");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    fruitStore.fruitsForSale = docSnap.data().data;
    writeToFile(
      JSON.stringify(fruitStore.fruitsForSale),
      androidFiles.FRUIT_FOR_SALE_PATH
    );
  } else {
    console.log("no data");
  }
  console.log("finished downloading");
  downloading.value = false;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function DraggableList() {
  for (let i = 0; i < fruitStore.saleCategories.length; i++) {
    let containerClass = `.category-${fruitStore.saleCategories[i]}`;

    const container = document.querySelector(containerClass);
    if (container) {
      const draggable = new Draggable(container, {
        draggable: ".fruit-specs",
        mirror: {
          constrainDimensions: true,
          appendTo: (source) => {
            return source.parentNode;
          },
        },
      });

      draggable.on("drag:start", (evt) => {
        isDragging.value = true;
        draggableSrc.value = evt.data.source.dataset.id;
      });

      draggable.on("mirror:destroy", (evt) => {
        // evt.cancel();
        //console.log(evt);
        // const { mirror } = evt;
        // mirror.classList.add("removing");
        // setTimeout(() => {
        //   mirror.parentNode.removeChild(mirror);
        // }, 1000);
      });

      draggable.on("drag:stop", (evt) => {
        isDragging.value = false;
        console.log("src", draggableSrc.value, "target", draggableTarget.value);
        if (draggableSrc.value == draggableTarget.value) {
          console.log("no changes in order");
        }
        if (draggableSrc.value != draggableTarget.value) {
          console.log("changing the order now");
        }
        draggableSrc.value = undefined;
      });
    }
  }
}

function draggableEntered(evt) {
  if (isDragging.value) {
    console.log("mouse enter");
    draggableTarget.value = evt.srcElement.dataset.id;
  }
}
function draggableLeave(evt) {
  if (isDragging.value) {
    draggableTarget.value = undefined;
    console.log("mouse left");
    console.log("problem is here");
  }
}
</script>

<style scoped>
.draggable-mirror {
  background: #cbcaca;
}
.draggable--over {
  border: 1px solid #cbcaca;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23cbcaca' fill-opacity='0.55' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
}

.removing {
  animation: vanish 1s;
}

@keyframes vanish {
  from {
    transform: translate3d(-91px, 799px, 0px) scale(1);
  }
  to {
    transform: translate3d(-91px, 799px, 0px) scale(0);
  }
}

.header {
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  font-size: 2rem;
  width: 100%;
  margin-bottom: 2rem;
  color: rgb(121, 120, 118);
}

.fruit-spec-layout {
  margin-top: 1rem;
}
.fruit-category {
  display: flex;
  margin: 0 1rem;

  align-items: center;
}
.category-word {
  padding-right: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
}
.black-line {
  background: rgb(143, 140, 140);
  height: 1px;
  flex: 1;
}

.fruit-specs {
  margin: 1rem 1rem;
  display: flex;
  font-size: 1.3rem;
  box-shadow: 4px 4px 6px #d2d3d4, -4px -4px 6px #ffffff, -2px -2px 6px #d2d3d4,
    -4px -4px 6px #ffffff;
  /* user-select: none; */
  /* -webkit-user-drag: element;
  cursor: move; */
}

.name-price-layout {
  display: flex;
  flex: 1;
}

.fruit-name {
  padding: 1rem 1rem;
  flex: 1;
}
.fruit-price {
  flex: 1;
  margin: auto;
}

.top-button-wrapper {
  display: flex;
  width: 100%;
  padding-right: 1rem;
  justify-content: flex-end;
  align-items: center;
}

.upload-status {
  margin-right: 0.5rem;
}

.upload-button {
  display: flex;
  width: min-content;
  height: 2.5rem;
  align-items: center;
  padding: 0 1rem;
  margin-right: 0.5rem;
  background: rgb(241, 110, 110);
  border-radius: 0.5rem;
}

.upload-button:active {
  background: rgb(236, 61, 61);
}

.upload-svg {
  height: 30px;
  width: 30px;
}

.download-button {
  display: flex;
  width: min-content;
  height: 2.5rem;
  align-items: center;
  padding: 0 1rem;
  margin-right: 0.5rem;
  background: rgb(193, 241, 110);
  border-radius: 0.5rem;
}
.download-button:active {
  background: rgb(96, 168, 76);
}

.cloud-svg {
  height: 30px;
  width: 30px;
}

.add-button {
  display: flex;
  width: min-content;
  align-items: center;
  padding: 0 1rem;
}

.add-svg {
  height: 30px;
  width: 30px;
}
.delete-svg-layout {
  padding: 0 10px;
  margin: auto;
}
.delete-svg {
  width: 30px;
  stroke: red;
  height: 30px;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #060b0e;
  border-radius: 50%;
  width: 27px;
  height: 27px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
