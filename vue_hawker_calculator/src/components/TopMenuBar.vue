<template>
  <div class="top-menu">
    <div class="category-swipe-layout">
      <div class="categories" ref="categoryBar">
        <div
          v-for="category in fruitStore.saleCategories"
          :key="category"
          class="category"
        >
          {{ category }}
        </div>
      </div>
    </div>
    <router-link to="/edit">
      <button ref="buttonRef" class="edit-button primary-button-design">
        更改
      </button>
    </router-link>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Hammer from "hammerjs";
import { useFruitStore } from "../stores/fruits";
const categoryBar = ref(null);
const buttonRef = ref(null);
const fruitStore = useFruitStore();

onMounted(() => {
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
.category:active {
  background: rgb(116, 224, 116);
}

.edit-button {
  width: 4rem;
}
</style>
