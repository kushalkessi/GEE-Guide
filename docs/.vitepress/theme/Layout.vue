<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import SupportUs from './components/SupportUs.vue'

const { page } = useData()
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after>
      <SupportUs />
    </template>
  </DefaultTheme.Layout>
</template>