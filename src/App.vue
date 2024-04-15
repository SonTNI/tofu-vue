<template>
  <div class="d-flex flex-column w-100 h-100">
    <HeaderNav />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import HeaderNav from './components/HeaderNav.vue';
</script>
