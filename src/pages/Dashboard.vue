<script setup>
import { computed, onMounted, ref } from "vue";
import useUsersStore from "../stores/usersStore";
import { UserOutlined } from "@ant-design/icons-vue";

import Table from "../common/Table.vue";
import Analysis from "../components/admin/Analysis.vue";
const userStore = useUsersStore();
</script>

<template>
  <a-layout class="dashboard-layout">
    <a-layout-header class="header">
      <div class="logo">Company name</div>
      <div class="header-right">
        <a-avatar size="large"
          ><template #icon><UserOutlined /></template
        ></a-avatar>
      </div>
    </a-layout-header>

    <a-layout-content class="content">
      <div class="inner-content">
        <Analysis />
        <Table :user-list="userStore.userList" />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background-color: #566a83;
  color: #fff;
}

.header-right {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo {
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.content {
  padding: 16px 24px;
}

.inner-content {
  background: #fff;
  padding: 16px 20px;
  min-height: calc(100vh - 100px);
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
