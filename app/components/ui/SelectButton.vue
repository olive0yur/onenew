<template>
  <button 
    class="select-button"
    :class="{ 'is-selected': isSelected }"
    @click="handleClick"
  >
    <img 
      :src="showSelectedIcon ? '/static/star.svg' : '/static/star-gray.svg'" 
      class="select-button-icon"
      :class="{ 'is-flicker': isFlickering }"
      alt=""
    />
    <span class="select-button-text" :class="{ 'is-selected': showSelectedIcon }">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  value: string;
  modelValue: string[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  'update:modelValue': [value: string[]];
}>();

const isSelected = computed(() => props.modelValue.includes(props.value));
const isFlickering = ref(false);
const showSelectedIcon = computed(() => isSelected.value || isFlickering.value);

const handleClick = () => {
  const newValue = [...props.modelValue];
  if (isSelected.value) {
    // 取消选中
    const index = newValue.indexOf(props.value);
    if (index > -1) {
      newValue.splice(index, 1);
    }
    emit('update:modelValue', newValue);
  } else {
    // 选中 - 先闪烁3下再更新状态
    isFlickering.value = true;
    setTimeout(() => {
      isFlickering.value = false;
      newValue.push(props.value);
      emit('update:modelValue', newValue);
    }, 500); // 闪烁动画持续时间
  }
};
</script>

<style scoped>
.select-button {
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
}

.select-button:hover {
  background: rgba(218, 218, 218, 0.80);
}

.select-button-icon {
  width: 18px;
  height: 18px;
  margin-right: 4px;
  flex-shrink: 0;
}

.select-button-text {
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
.select-button-text.is-selected {
  color: #3B4EFF;
}

/* 闪烁动画 - 只有选中的SVG闪烁3下 */
.select-button-icon.is-flicker {
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
  .select-button {
    min-width: 114px;
    height: auto;
    padding: 12px 16px;
  }
  
  .select-button-text {
    font-size: 16px;
    line-height: 16px;
  }
  
  .select-button-icon {
    width: 14px;
    height: 14px;
  }
}
</style>

