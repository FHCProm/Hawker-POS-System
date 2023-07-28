<template>
  <div class="modal-container">
    <div class="confirmation-box-content">
      <label class="pop-up-label" for="password">请输入密码</label>
      <input
        class="input-design"
        type="password"
        v-model="password"
        name="password"
      />
      <div v-if="failedValidation" class="wrong-password">错误密码</div>
      <div class="button-container">
        <button
          class="primary-button-design confirm-button"
          @click="verifyPassword"
        >
          确定
        </button>
        <button class="cancel-button-design" @click="cancelAction">取消</button>
      </div>
    </div>
  </div>
  <div class="backdrop"></div>
</template>

<script setup>
import { ref } from "vue";

const password = ref("");
const failedValidation = ref(false);
const emit = defineEmits(["confirmationResult"]);
function verifyPassword() {
  if (password.value == "123456") {
    emit("confirmationResult", true);
  } else {
    failedValidation.value = true;
  }
}
function cancelAction() {
  emit("confirmationResult", false);
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

.pop-up-label {
  display: block;
  margin: 10px 0;
}

.input-design {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1.2rem;
  border: none;
  width: 250px;
  box-shadow: 1px 1px 3px #555555;
}

.wrong-password {
  color: red;
}
.button-container {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
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
