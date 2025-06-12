<template>
  <div class="support-button">
    <button @click="openPopup" class="support-link">Support Us</button>

    <div v-if="showPopup" class="popup-overlay" @click.self="closePopup">
      <div class="popup-content">
        <button class="close-btn" @click="closePopup">×</button>
        <img
          src="../../../images/APN_QR.png"
          alt="APN QR Code"
          @load="showImage = true"
          v-show="showImage"
          class="fullscreen-image"
        />
        <div v-show="!showImage" class="loader"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showPopup = ref(false)
const showImage = ref(false)

function openPopup() {
  showPopup.value = true
  showImage.value = false
}

function closePopup() {
  showPopup.value = false
  showImage.value = false
}

function onKeyDown(event) {
  if (event.key === 'Escape' && showPopup.value) {
    closePopup()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
.support-button {
  margin-left: 1rem;
  display: flex;
  align-items: center;
}

.support-link {
  background-color: #c53b3b;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.support-link:hover {
  background-color: #128807;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  position: relative;
  max-width: 95vw;
  max-height: 95vh;
  overflow: hidden;
  border-radius: 10px;
  text-align: center;
  background: transparent;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 36px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 1010;
  user-select: none;
}

.fullscreen-image {
  width: 90vw;
  height: 90vh;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.loader {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #c53b3b;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1005;
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}
</style>
