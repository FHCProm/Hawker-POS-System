<template>
  <div class="header">
    <BackButton back-path="/cartPage/0"></BackButton>
    <div>今日交易记录</div>
  </div>
  <div
    class="history-container"
    v-for="history in arrangeHistory"
    :key="history"
  >
    <div class="history-row" :class="{ 'yellow-border': history.bookmarked }">
      <div class="history-first-row">
        <div class="first-row-time">
          {{ timeFromNow(history.transactionId) }}
        </div>
        <div
          class="star-svg-layout"
          @click="toggleBookmark(history.transactionId)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="star-svg"
            :class="{ bookmarked: history.bookmarked }"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </div>
      </div>
      <div class="fruit-list" @click="populateCartPage(history.fruits)">
        <div class="list-item" v-for="row in history.fruits" :key="row">
          {{ row.measuredAmount }} {{ row.measurement }} {{ row.name }}
        </div>
      </div>
      <div class="total-price" @click="populateCartPage(history.fruits)">
        RM{{ history.total }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref } from "vue";
import BackButton from "../components/BackButton.vue";
import moment from "moment";
import { useFruitStore } from "../stores/fruits";
import { useRoute, useRouter } from "vue-router";
import { deepCopyArray } from "../utility/array-helper";
import { writeToFile } from "../utility/android-fs";
import androidFiles from "../config/androidFiles";

const fruitStore = useFruitStore();

const router = useRouter();

function populateCartPage(transactionHistory) {
  fruitStore.fruitsInCart = deepCopyArray(transactionHistory);
  router.push({
    name: "cartPage",
    params: { newTradeId: 0 },
  });
}

// ref([
//   {
//     transactionId: 1689777471127,
//     bookmarked: false,
//     total: "123.00",
//     fruits: [
//       {
//         id: 1689777471127,
//         name: "木瓜",
//         price: "2.60",
//         measurement: "kg",
//         category: "普通",
//         measuredAmount: "2.30",
//         total: "10.20",
//         tradeId: 1689777471321,
//       },

//       {
//         id: 1689777471128,
//         name: "白木薯",
//         price: "4.00",
//         measurement: "kg",
//         category: "普通",
//         measuredAmount: "3",
//         total: "8.00",
//         tradeId: 1689777471562,
//       },
//       {
//         id: 1689777471128,
//         name: "apple",
//         price: "4.00",
//         measurement: "kg",
//         category: "最贵",
//         measuredAmount: "3",
//         total: "8.00",
//         tradeId: 1689777471111,
//       },
//     ],
//   },
//   {
//     transactionId: 1689777471127,
//     bookmarked: false,
//     total: "8.00",
//     fruits: [
//       {
//         id: 1689777471128,
//         name: "apple",
//         price: "4.00",
//         measurement: "kg",
//         category: "最贵",
//         measuredAmount: "3",
//         total: "8.00",
//         tradeId: 1689777471111,
//       },
//     ],
//   },
//   {
//     transactionId: 1689777471127,
//     bookmarked: false,
//     total: "10.20",
//     fruits: [
//       {
//         id: 1689777471127,
//         name: "木瓜",
//         price: "2.60",
//         measurement: "kg",
//         category: "普通",
//         measuredAmount: "2.30",
//         total: "10.20",
//         tradeId: 1689777471321,
//       },
//     ],
//   },
// ]);

function timeFromNow(data) {
  return moment(data).fromNow();
}

function toggleBookmark(id) {
  for (let i = 0; i < fruitStore.tradeHistory.length; i++) {
    if (id == fruitStore.tradeHistory[i].transactionId) {
      fruitStore.tradeHistory[i].bookmarked =
        !fruitStore.tradeHistory[i].bookmarked;
    }
  }

  writeToFile(
    JSON.stringify(fruitStore.tradeHistory),
    androidFiles.FRUIT_HISTORY
  );
}

// function arrangeHistory() {
//   let historyCopy = deepCopyArray(fruitStore.tradeHistory);
//   fruitStore.tradeHistory.splice(0, fruitStore.tradeHistory.length);
//   let arrangedVersion = [];

//   //filter out bookmarks
//   let bookmarkedHistory = [];
//   let indexesToRemove = [];
//   for (let i = 0; i < historyCopy.length; i++) {
//     if (historyCopy[i].bookmarked) {
//       indexesToRemove.push(i);
//       bookmarkedHistory.push(historyCopy[i]);
//     }
//   }

//   for (let i = indexesToRemove.length - 1; i >= 0; i--) {
//     historyCopy.splice(indexesToRemove[i], 1);
//   }

//   while (bookmarkedHistory.length != 0) {
//     let indexToRemove = 0;
//     let biggestUnix = bookmarkedHistory[0].transactionId;
//     for (let i = 0; i < bookmarkedHistory.length; i++) {
//       if (bookmarkedHistory[i].transactionId > biggestUnix) {
//         biggestUnix = bookmarkedHistory[i].transactionId;
//         indexToRemove = i;
//       }
//     }
//     arrangedVersion.push(bookmarkedHistory[indexToRemove]);
//     bookmarkedHistory.splice(indexToRemove, 1);
//   }

//   //after removed the bookmarked history , we proceed with non-bookmarked ones

//   while (historyCopy.length != 0) {
//     let indexToRemove = 0;
//     let biggestUnix = historyCopy[0].transactionId;
//     for (let i = 0; i < historyCopy.length; i++) {
//       if (historyCopy[i].transactionId > biggestUnix) {
//         biggestUnix = historyCopy[i].transactionId;
//         indexToRemove = i;
//       }
//     }
//     arrangedVersion.push(historyCopy[indexToRemove]);
//     historyCopy.splice(indexToRemove, 1);
//   }
//   console.log(arrangedVersion);
//   return arrangedVersion;
// }

const arrangeHistory = computed(() => {
  let historyCopy = deepCopyArray(fruitStore.tradeHistory);
  let arrangedVersion = [];
  //filter out bookmarks
  let bookmarkedHistory = [];
  let indexesToRemove = [];
  for (let i = 0; i < historyCopy.length; i++) {
    if (historyCopy[i].bookmarked) {
      indexesToRemove.push(i);
      bookmarkedHistory.push(historyCopy[i]);
    }
  }
  for (let i = indexesToRemove.length - 1; i >= 0; i--) {
    historyCopy.splice(indexesToRemove[i], 1);
  }

  while (bookmarkedHistory.length != 0) {
    let indexToRemove = 0;
    let biggestUnix = bookmarkedHistory[0].transactionId;
    for (let i = 0; i < bookmarkedHistory.length; i++) {
      if (bookmarkedHistory[i].transactionId > biggestUnix) {
        biggestUnix = bookmarkedHistory[i].transactionId;
        indexToRemove = i;
      }
    }
    arrangedVersion.push(bookmarkedHistory[indexToRemove]);
    bookmarkedHistory.splice(indexToRemove, 1);
  }

  //after removed the bookmarked history , we proceed with non-bookmarked ones

  while (historyCopy.length != 0) {
    let indexToRemove = 0;
    let biggestUnix = historyCopy[0].transactionId;
    for (let i = 0; i < historyCopy.length; i++) {
      if (historyCopy[i].transactionId > biggestUnix) {
        biggestUnix = historyCopy[i].transactionId;
        indexToRemove = i;
      }
    }
    arrangedVersion.push(historyCopy[indexToRemove]);
    historyCopy.splice(indexToRemove, 1);
  }
  console.log(arrangedVersion);
  return arrangedVersion;
});
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  font-size: 2rem;
  width: 100%;
  margin-bottom: 2rem;
  color: rgb(121, 120, 118);
}

.history-container {
  padding: 0 0.5rem;
  margin-bottom: 1rem;
}

.history-row {
  border: 1px solid rgb(196, 194, 194);
  padding: 0.2rem;
}
.yellow-border {
  border: 1px solid rgb(255, 158, 2);
}

.history-first-row {
  display: flex;
  align-content: space-between;
}
.first-row-time {
  flex: 1;
}
.star-svg-layout {
  width: 50px;
  height: 40px;
  display: flex;
  align-items: center;
}
.star-svg {
  flex: 1;
  width: 30px;
  height: 30px;
  fill: gray;
}
.bookmarked {
  fill: rgb(252, 198, 2);
}

.fruit-list {
  display: flex;
  flex-wrap: wrap;
}
.list-item {
  padding: 0 0.5rem;
  margin-top: 10px;
  font-size: 1.2rem;
  border-right: 1px solid rgb(196, 194, 194);
}

.total-price {
  font-weight: bold;
  margin-top: 0.5rem;
  text-align: right;
}
</style>
