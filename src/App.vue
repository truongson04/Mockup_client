<script setup></script>
<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#001529',
      },
    }"
  >
    <router-view></router-view>
  </a-config-provider>
</template>
