<template>
  <div class="business-card-list-container">
    <div class="business-card-list-wrapper">
      <div 
        class="business-card-item group flex bg-[#DADADA99] hover:bg-[#3B4EFF] p-[16px]" 
        style="gap: clamp(10px, 1.3vw, 16px);" 
        v-for="(item, index) in items" 
        :key="index"
      >
        <div class="flex-shrink-0">
          <img 
            style="width: clamp(60px, 7vw, 88px); height: clamp(60px, 7vw, 88px);" 
            :src="getItemImage(item)" 
            alt=""
          >
        </div>
        <div class="flex flex-col">
          <span 
            style="font-size: clamp(16px, 2vw, 24px); line-height: clamp(20px, 2vw, 24px); margin-bottom: clamp(8px, 1.3vw, 16px);" 
            class="business-text-ellipsis group-hover:text-white"
            :title="item?.label"
          >{{ item?.label }}</span>
          <span 
            style="font-size: clamp(12px, 1.3vw, 16px); line-height: clamp(18px, 2vw, 24px);" 
            class="text-[#00000066] business-text-ellipsis group-hover:text-white"
            :title="item?.dict_value"
          >{{ item?.dict_value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type AnyFn = (...args: any[]) => any;

const props = withDefaults(
  defineProps<{
    items?: any[];
    imgKey?: string;
    labelKey?: string;
    valueKey?: string;
    resolveImg?: AnyFn;
  }>(),
  {
    items: () => [],
    imgKey: "img",
    labelKey: "label",
    valueKey: "dict_value",
    resolveImg: (v: any) => (v == null ? "" : String(v)),
  }
);

const getItemImage = (item: any) => {
  const raw = item?.[props.imgKey];
  try {
    return props.resolveImg(raw);
  } catch {
    return "";
  }
};
</script>

<style scoped>
.business-card-list-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
}

.business-card-list-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(12px, 1.6vw, 20px);
  width: 100%;
  max-width: 100%;
}

.business-card-item {
  flex: 1 1 0;
  min-width: 0;
}

/* 移动端：纵向排列，一行一个 */
@media screen and (max-width: 768px) {
  .business-card-list-container {
    padding: 0 20px 20px;
    margin-top: -40px;
  }
  
  .business-card-list-wrapper {
    flex-direction: column;
    width: 100%;
    gap: 16px;
  }
  
  .business-card-item {
    width: 100%;
    max-width: 100%;
  }
}

.business-text-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
}
</style>

