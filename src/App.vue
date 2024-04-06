<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { firebaseApp } from './firebase/firebase';
import LoadingOverlay from '@/components/LoadingOverlay.vue'
</script>

<template>
  <div>
    <RouterView />
  </div>
  <LoadingOverlay />
</template>

<style>
body {
  background-color: gray;
}
</style>
