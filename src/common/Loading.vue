<script setup></script>
<template>
  <div class="loading-container">
    <a-spin
      :spinning="true"
      tip="Loading..."
      size="large"
      class="spin-circle"
    ></a-spin>
  </div>
</template>
<style scoped>
.loading-container {
  height: 100vh;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  background: rgba(126, 123, 123, 0.5);
  backdrop-filter: blur(5px);
}
</style>
