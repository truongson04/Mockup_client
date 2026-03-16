<script setup></script>
<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#2f5d86',
        colorPrimaryHover: '#244b6b',
      },
    }"
  >
    <router-view></router-view>
  </a-config-provider>
</template>
