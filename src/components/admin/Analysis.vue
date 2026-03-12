<script setup>
import useUsersStore from "../../stores/usersStore";

const userStore = useUsersStore();
</script>
<template>
  <a-row>
    <a-col span="8"
      ><a-card title="Active">{{ userStore.userList.length }}</a-card></a-col
    >
  </a-row>
</template>
