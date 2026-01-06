<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast-item"
          @click="remove(toast.id)"
        >
          <span class="toast-icon" :style="{ background: colors[toast.type] }">{{ icons[toast.type] }}</span>
          <span class="toast-message">{{ toast.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast';

const { toasts, remove } = useToast();

const icons = {
  success: '✓',
  error: '✕',
  warning: '!',
  info: 'i',
};

const colors = {
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.toast-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  min-width: 280px;
  max-width: 400px;
}

.toast-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.toast-message {
  font-size: 14px;
  color: #1a1a1a;
  line-height: 1.4;
}

/* 动画 */
.toast-enter-active {
  animation: slideIn 0.3s ease;
}

.toast-leave-active {
  animation: slideOut 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

@media screen and (max-width: 768px) {
  .toast-container {
    top: 16px;
    right: 16px;
    left: 16px;
  }
  
  .toast-item {
    min-width: auto;
    max-width: none;
  }
}
</style>

