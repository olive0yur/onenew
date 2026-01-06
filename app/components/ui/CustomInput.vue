<template>
  <div class="custom-input-wrapper" :class="{ 'is-textarea': isTextarea }">
    <textarea
      v-if="isTextarea"
      :value="modelValue"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      class="custom-input custom-textarea"
      :class="{ 'is-focused': isFocused, 'has-value': hasValue }"
      :rows="rows"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
    />
    <input
      v-else
      :value="modelValue"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      class="custom-input"
      :class="{ 'is-focused': isFocused, 'has-value': hasValue }"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
    />
    <div class="placeholder-wrapper" :class="{ 'is-textarea': isTextarea }" v-if="!hasValue">
      <span class="placeholder-primary">{{ primaryPlaceholder }}</span>
      <span class="placeholder-secondary">{{ secondaryPlaceholder }}</span>
    </div>
    <div class="border-bottom">
      <div class="border-progress" :class="{ 'animate': isFocused }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  modelValue: string;
  primaryPlaceholder: string;
  secondaryPlaceholder: string;
  isTextarea?: boolean;
  rows?: number;
}

const props = withDefaults(defineProps<Props>(), {
  isTextarea: false,
  rows: 3,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const isFocused = ref(false);

const hasValue = computed(() => {
  return props.modelValue && props.modelValue.length > 0;
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};
</script>

<style scoped>
.custom-input-wrapper {
  position: relative;
  width: 100%;
}

.custom-input {
  width: 100%;
  padding: 24px 0;
  border: none;
  outline: none;
  background: transparent;
  color: #000;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  text-transform: capitalize;
  position: relative;
  z-index: 2;
  
  /* 手机端样式 */
  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 16px;
    padding: 16px 0;
  }
}

.placeholder-wrapper {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 16px;
  pointer-events: none;
  z-index: 1;
  
  /* 手机端样式 */
  @media screen and (max-width: 768px) {
    gap: 8px;
  }
}

.placeholder-primary {
  color: rgba(0, 0, 0, 0.30);
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  text-transform: capitalize;
  
  /* 手机端样式 */
  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 16px;
  }
}

.placeholder-secondary {
  color: rgba(0, 0, 0, 0.30);
  font-family: "Noto Sans SC";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  
  /* 手机端样式 */
  @media screen and (max-width: 768px) {
    font-size: 12px;
    line-height: 12px;
  }
}

.border-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #DCDCDC;
  overflow: hidden;
}

.border-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  background: #3B4EFF;
  transition: none;
}

.border-progress.animate {
  animation: progressAnimation 0.6s ease-out forwards;
}

.custom-input.is-focused ~ .border-bottom .border-progress,
.custom-input.has-value ~ .border-bottom .border-progress {
  width: 100%;
  background: #3B4EFF;
}

@keyframes progressAnimation {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* Textarea 样式 */
.custom-textarea {
  resize: none;
  line-height: 1.5;
  min-height: auto;
  padding: 0 0 24px 0;
}

.custom-input-wrapper.is-textarea {
  padding-top: 0;
}

.placeholder-wrapper.is-textarea {
  top: 0;
  transform: translateY(0);
  align-items: center;
  height: 32px;
}

.placeholder-wrapper.is-textarea .placeholder-primary {
  line-height: 1;
}

.placeholder-wrapper.is-textarea .placeholder-secondary {
  line-height: 1;
}
</style>

