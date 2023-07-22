<template>
  <div class="header">
    <BackButton back-path="/cartPage/0"></BackButton>
    <div>今日交易记录</div>
  </div>
  <div class="history-container">
    <div class="history-row">
      <div>6 minutes ago</div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="star-svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      </div>
      <div>6kg banana, 60kg tapioca, 1.2kg papaya, 6kg banana</div>
      <div>RM274.32</div>
    </div>
  </div>
</template>

<script setup>
import BackButton from "../components/BackButton.vue";
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

.star-svg {
  width: 30px;
  height: 30px;
  fill: gray;
}
.history-container {
  padding: 0 0.5rem;
}

.history-row {
  border: 1px solid rgb(196, 194, 194);
  padding: 0.2rem;
}
</style>
