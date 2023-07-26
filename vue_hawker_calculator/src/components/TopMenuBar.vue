<template>
  <div class="top-menu">
    <div class="category-swipe-layout">
      <div class="categories" ref="categoryBar">
        <div
          v-for="category in fruitStore.saleCategories"
          :key="category"
          class="category"
          @click="changedCategory(category)"
          :class="{ 'category-selected': selectedCategory == category }"
        >
          {{ category }}
        </div>
      </div>
    </div>
    <router-link to="/edit">
      <button ref="buttonRef" class="edit-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="wrench-svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.867 19.125h.008v.008h-.008v-.008z"
          />
        </svg>
      </button>
    </router-link>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import Hammer from "hammerjs";
import { useFruitStore } from "../stores/fruits";
const categoryBar = ref(null);
const buttonRef = ref(null);
const fruitStore = useFruitStore();
const selectedCategory = ref("普通");

const emit = defineEmits(["changedCategory"]);

onMounted(() => {
  // nextTick(() => {
  //   emit("changedCategory", selectedCategory.value);
  // });

  const mc = new Hammer.Manager(categoryBar.value);
  mc.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_ALL }));

  let distanceTranslated = 0;
  const maxDistance =
    categoryBar.value.scrollWidth - categoryBar.value.clientWidth;

  mc.on("swipe", (event) => {
    if (event.direction == 2) {
      distanceTranslated -= event.distance;
    } else {
      distanceTranslated += event.distance;
    }

    if (distanceTranslated < -maxDistance) {
      distanceTranslated = -maxDistance;
    }
    if (distanceTranslated > 0) {
      distanceTranslated = 0;
    }
    categoryBar.value.style.transform = `translateX(${distanceTranslated}px)`;
  });
});

function changedCategory(category) {
  selectedCategory.value = category;
  emit("changedCategory", selectedCategory.value);
}
</script>

<style scoped>
.top-menu {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding: 0 0.5rem;
  align-items: center;
}

.category-swipe-layout {
  flex: 1;
  margin-right: 0.5rem;
  overflow: hidden;
}
.categories {
  display: flex;
  transition: transform 0.3s ease-out;
}
.category {
  background: rgb(185, 230, 185);
  padding: 0.5rem;
  margin: 0 0.3rem;
  white-space: nowrap;
  border-radius: 0.5rem;
}

.category-selected {
  background: rgb(4, 114, 4);
  color: white;
}

.edit-button {
  height: 100%;
}
.wrench-svg {
  height: 30px;
  width: 30px;
  stroke: rgb(78, 108, 78);
  transform: rotate(270deg);
}
</style>
