<template>
  <div class="popup-container">
    <div class="popup">
      <calculator @data-ready="sendingEventToParent" ref="calculatorComponent">
        <div class="calculator-display">
          <div class="RM-label">RM</div>
          <div class="RM-value">
            {{ calculatorComponent?.calculatorDisplayValue }}
          </div>
        </div>
      </calculator>
    </div>
  </div>

  <div class="backdrop"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import calculator from "./calculator.vue";

const emit = defineEmits(["dataReady"]);
const calculatorComponent = ref(null);

function sendingEventToParent(data) {
  emit("dataReady", data);
}
</script>

<style scoped>
.popup-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  display: grid;
  justify-content: center;
  align-items: end;
}
.popup {
  margin-bottom: 100px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  width: 90vw;
  max-width: 700px;
  animation-name: slide-up;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
}

@keyframes slide-up {
  0% {
    transform: translateY(100%) scale(0.5);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

.backdrop {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 0;
  background: rgba(133, 131, 131, 0.463);
  animation: blur 1s ease-in-out forwards;
}

@keyframes blur {
  from {
    backdrop-filter: blur(0px);
  }
  to {
    backdrop-filter: blur(5px);
  }
}

.calculator-display {
  display: flex;
  position: relative;
  padding: 1rem;
  margin: 0 1rem;
  margin-top: 1rem;
  justify-content: space-between;
  box-shadow: inset 2px 2px 6px #8a8b8b;
  align-items: baseline;
  background: rgb(163, 178, 163);
}
.RM-label {
  font-size: 1rem;
}

.RM-value {
  font-size: 1.5rem;
}
</style>
