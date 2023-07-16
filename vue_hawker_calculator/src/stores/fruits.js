import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useFruitStore = defineStore("fruits", () => {
  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  // return { count, doubleCount, increment }

  const bodyElement = ref(null);

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

  const fruitsInCart = ref([
    {
      name: "木瓜",
      kilogram: "1.2",
      total: "4",
    },
    {
      name: "白木薯",
      kilogram: "2",
      total: "5",
    },

    {
      name: "白木薯",
      kilogram: "2",
      total: "5",
    },
  ]);

  return { fruitsForSale, fruitsInCart };
});
