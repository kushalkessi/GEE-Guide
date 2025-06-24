<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import SupportUs from './components/SupportUs.vue'
import Login from './components/login.vue'

const { page } = useData()
</script>

<template>
  <DefaultTheme.Layout>
    
    <!-- Inject Login component after nav bar -->
    <template #nav-bar-content-after>
      <SupportUs />
      <Login /> <!-- ⬅️ Your Login component -->

    </template>

  </DefaultTheme.Layout>
</template>
