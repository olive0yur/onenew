<template>
  <button 
    class="radio-button"
    :class="{ 'is-selected': isSelected }"
    @click="handleClick"
  >
    <img 
      :src="showSelectedIcon ? '/static/star.svg' : '/static/star-gray.svg'" 
      class="radio-button-icon"
      :class="{ 'is-flicker': isFlickering }"
      alt=""
    />
    <span class="radio-button-text" :class="{ 'is-selected': showSelectedIcon }">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  value: string;
  modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const isSelected = computed(() => props.modelValue === props.value);
const isFlickering = ref(false);
const showSelectedIcon = computed(() => isSelected.value || isFlickering.value);

const handleClick = () => {
  if (isSelected.value) {
    // 已选中，取消选中
    emit('update:modelValue', '');
  } else {
    // 未选中，先闪烁3下再更新状态
    isFlickering.value = true;
    setTimeout(() => {
      isFlickering.value = false;
      emit('update:modelValue', props.value);
    }, 500);
  }
};
</script>

<style scoped>
.radio-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  height: 59px;
  padding: 18px 16px;
  border-radius: 44.44px;
  background: rgba(218, 218, 218, 0.60);
  backdrop-filter: blur(12.5px);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 16px;
  margin-bottom: 18px;
}

.radio-button:hover {
  background: rgba(218, 218, 218, 0.80);
}

.radio-button-icon {
  width: 18px;
  height: 18px;
  margin-right: 4px;
  flex-shrink: 0;
}

.radio-button-text {
  color: rgba(0, 0, 0, 0.30);
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  transition: color 0.3s ease;
  white-space: nowrap;
}

/* 选中状态 */
.radio-button-text.is-selected {
  color: #3B4EFF;
}

/* 闪烁动画 - 只有选中的SVG闪烁3下 */
.radio-button-icon.is-flicker {
  animation: iconFlicker 0.5s ease;
}

@keyframes iconFlicker {
  0% { opacity: 1; }
  16% { opacity: 0; }
  33% { opacity: 1; }
  50% { opacity: 0; }
  66% { opacity: 1; }
  83% { opacity: 0; }
  100% { opacity: 1; }
}

/* 响应式 */
@media screen and (max-width: 768px) {
  .radio-button {
    min-width: 120px;
    height: 48px;
    padding: 14px 12px;
  }
  
  .radio-button-text {
    font-size: 18px;
    line-height: 18px;
  }
  
  .radio-button-icon {
    width: 14px;
    height: 14px;
  }
}
</style>

