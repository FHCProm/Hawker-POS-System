<template>
  <div class="modal-container">
    <div class="confirmation-box-content">
      <div class="box-word">是否要删除？</div>
      <div class="button-container">
        <button
          class="primary-button-design confirm-button"
          @click="confirmAction(true)"
        >
          是
        </button>
        <button class="cancel-button-design" @click="confirmAction(false)">
          取消
        </button>
      </div>
    </div>
  </div>
  <div class="backdrop"></div>
</template>

<script setup>
const emit = defineEmits(["confirmationDone"]);

function confirmAction(boolean) {
  emit("confirmationDone", boolean);
}
</script>

<style scoped>
.modal-container {
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: grid;
}
.confirmation-box-content {
  margin: auto;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  height: min-content;
  width: min-content;
}
.box-word {
  width: 250px;
  font-size: 1.5rem;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
}
.button-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.confirm-button {
  width: 5rem;
}
.backdrop {
  position: absolute;

  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  z-index: 0;
  background: rgba(133, 131, 131, 0.463);
  animation: blur 1s ease-in-out forwards;
}
</style>
