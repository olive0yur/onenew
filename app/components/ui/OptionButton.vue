<template>
  <button 
    class="option-button"
    :class="{ 'is-selected': isSelected }"
    @click="handleClick"
  >
    <img 
      :src="showSelectedIcon ? '/static/star.svg' : '/static/star-gray.svg'" 
      class="option-button-icon"
      :class="{ 'is-flicker': isFlickering }"
      alt=""
    />
    <span class="option-button-text" :class="{ 'is-selected': showSelectedIcon }">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  value: string | number;
  modelValue: string;
  multiple?: boolean; // 是否支持多选，多选时值用逗号分隔
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

// 将逗号分隔的字符串转为数组
const getValueArray = () => {
  if (!props.modelValue) return [];
  return props.modelValue.split(',').filter(v => v);
};

const isSelected = computed(() => {
  const valueStr = String(props.value);
  if (props.multiple) {
    return getValueArray().includes(valueStr);
  }
  return props.modelValue === valueStr;
});

const isFlickering = ref(false);
const showSelectedIcon = computed(() => isSelected.value || isFlickering.value);

const handleClick = () => {
  const valueStr = String(props.value);
  
  if (props.multiple) {
    // 多选模式 - 用逗号分隔
    const currentArr = getValueArray();
    
    if (isSelected.value) {
      // 取消选中
      const newArr = currentArr.filter(v => v !== valueStr);
      emit('update:modelValue', newArr.join(','));
    } else {
      // 选中 - 先闪烁3下再更新状态
      isFlickering.value = true;
      setTimeout(() => {
        isFlickering.value = false;
        currentArr.push(valueStr);
        emit('update:modelValue', currentArr.join(','));
      }, 500);
    }
  } else {
    // 单选模式
    if (isSelected.value) {
      // 已选中，取消选中
      emit('update:modelValue', '');
    } else {
      // 未选中，立即更新值，同时闪烁动画
      emit('update:modelValue', valueStr);
      isFlickering.value = true;
      setTimeout(() => {
        isFlickering.value = false;
      }, 500);
    }
  }
};
</script>

<style scoped>
.option-button {
  display: inline-flex;
  align-items: center;
  /* justify-content: center; */
  height: 59px;
  padding: 18px 16px;
  border-radius: 44.44px;
  background: rgba(218, 218, 218, 0.60);
  backdrop-filter: blur(12.5px);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  /* margin-right: 16px;
  margin-bottom: 18px; */
}

.option-button:hover {
  background: rgba(218, 218, 218, 0.80);
}

.option-button-icon {
  width: 18px;
  height: 18px;
  margin-right: 4px;
  flex-shrink: 0;
}

.option-button-text {
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
.option-button-text.is-selected {
  color: #3B4EFF;
}

/* 闪烁动画 - 只有选中的SVG闪烁3下 */
.option-button-icon.is-flicker {
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
  .option-button {
    height: auto;
    padding: 12px 16px;
    margin-right: 0;
    margin-bottom: 0;
  }
  
  .option-button-text {
    font-size: 16px;
    line-height: 16px;
  }
  
  .option-button-icon {
    width: 14px;
    height: 14px;
  }
}
</style>

