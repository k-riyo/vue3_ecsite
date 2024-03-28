<script setup lang="ts">
import { useProgressStore } from '@/stores/progress'
import { COverlay, CProgress, CCenter, CStack } from '@luchta-io/cuv';
</script>
<template>
    <COverlay v-model="useProgressStore().isProgress" disabled>
        <CCenter>
            <CStack>
                <CProgress color="link" />
                <span class="text-white text-xl font-semibold">Loading...</span>
            </CStack>
        </CCenter>
    </COverlay>
</template>
