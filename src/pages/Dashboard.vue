<script setup>
import { computed, onMounted, ref } from "vue";
import useUsersStore from "../stores/usersStore";
import { UserOutlined } from "@ant-design/icons-vue";

import Table from "../common/Table.vue";
import Analysis from "../components/admin/Analysis.vue";
const userStore = useUsersStore();

onMounted(() => {
  console.log(userStore.countryList);
});
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
        <analysis />
        <Table :user-list="userStore.userList" />
      </div>
    </a-layout-content>

    <a-layout-footer class="footer">
      Dashboard Layout ©{{ new Date().getFullYear() }} Created with Ant Design
      Vue
    </a-layout-footer>
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
  background-color: #001529;
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
  padding: 24px;
}

.inner-content {
  background: #fff;
  padding: 24px;
  min-height: 380px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.footer {
  text-align: center;
  color: #888;
}
</style>
