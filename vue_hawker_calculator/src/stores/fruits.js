import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useFruitStore = defineStore("fruits", () => {
  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  // return { count, doubleCount, increment }

  const fruitsForSale = ref([
    {
      name: "木瓜",
      price: "2.60",
    },
    {
      name: "白木薯",
      price: "4.00",
    },
    {
      name: "木瓜",
      price: "2.60",
    },
    {
      name: "白木薯",
      price: "4.00",
    },
    {
      name: "木瓜",
      price: "2.60",
    },
    {
      name: "白木薯",
      price: "4.00",
    },
  ]);

  return { fruitsForSale };
});
