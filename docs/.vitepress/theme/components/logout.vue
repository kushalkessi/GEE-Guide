<script setup>
import DefaultTheme from "vitepress/theme";
import Login from "./components/login.vue";
import SupportUs from "./components/SupportUs.vue";
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after>
      <SupportUs />
      <Login />
    </template>
  </DefaultTheme.Layout>
</template>

