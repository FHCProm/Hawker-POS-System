import { ref, computed } from "vue";
import { defineStore } from "pinia";
import firebaseConfig from "../config/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const useFruitStore = defineStore("fruits", () => {
  const firebase = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebase);

  const fruitsForSale = ref([
    // {
    //   id: 1689777471127,
    //   name: "木瓜",
    //   price: "2.60",
    //   measurement: "kg",
    //   category: "普通",
    // },
    // {
    //   id: 1689777471128,
    //   name: "白木薯",
    //   price: "2.90",
    //   measurement: "kg",
    //   category: "普通",
    // },
    // {
    //   id: 1689777471129,
    //   name: "香蕉",
    //   price: "3.20",
    //   measurement: "kg",
    //   category: "最便宜",
    // },
    // {
    //   id: 1689777471200,
    //   name: "椰子",
    //   price: "4.00",
    //   measurement: "粒",
    //   category: "最便宜",
    // },
  ]);

  const fruitsInCart = ref([
    // {
    //   id: 1689777471127,
    //   name: "木瓜",
    //   price: "2.60",
    //   measurement: "kg",
    //   category: "普通",
    //   measuredAmount: "2.30",
    //   total: "10.20",
    //   tradeId: 1689777471321,
    // },
    // {
    //   id: 1689777471128,
    //   name: "白木薯",
    //   price: "4.00",
    //   measurement: "kg",
    //   category: "普通",
    //   measuredAmount: "3",
    //   total: "8.00",
    //   tradeId: 1689777471562,
    // },
    // {
    //   id: 1689777471128,
    //   name: "apple",
    //   price: "4.00",
    //   measurement: "kg",
    //   category: "最贵",
    //   measuredAmount: "3",
    //   total: "8.00",
    //   tradeId: 1689777471111,
    // },
  ]);

  const tradeHistory = ref([]);

  const saleCategories = ref(["普通", "做生意", "最便宜"]);

  const measurementCategory = ref(["kg", "粒"]);

  return {
    fruitsForSale,
    fruitsInCart,
    saleCategories,
    measurementCategory,
    tradeHistory,
    firebase,
    firestore,
  };
});
