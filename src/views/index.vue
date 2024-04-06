<script setup lang="ts">
import { useSessionStore } from '@/stores/session';
import HeaderFooter from '@/components/templates/HeaderFooter.vue';

const store = useSessionStore()

</script>
<template>
  <HeaderFooter>
    <div class="h-[1500px]">
      ホーム
      {{ store.getアカウント }}
    </div>
  </HeaderFooter>
</template>
