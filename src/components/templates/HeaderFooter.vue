<script setup lang="ts">
import { CCover } from '@luchta-io/cuv';
import Header from '@/components/molecules/Header.vue'
import Footer from '@/components/molecules/Footer.vue'

</script>

<template>
    <CCover space="" class="bg-yellow-100 overscroll-none" centered="div">
        <Header class="sticky top-0" />
        <div>
            <slot />
        </div>
        <Footer class="relative"/>
    </CCover>
</template>
