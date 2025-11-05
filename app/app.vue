<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useWebCount } from '~/composables/api/useHttpExample';
if(process.server){
  await useWebCount();
}
</script>
