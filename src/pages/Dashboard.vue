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
      <div class="logo">現場状況ダッシュボード</div>
      <div class="header-right">
        <a-avatar size="large"
          ><template #icon><UserOutlined /></template
        ></a-avatar>
      </div>
    </a-layout-header>

    <a-layout-content class="content">
      <div class="inner-content">
        <Analysis />
        <Table />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background-color: #f0f2f5;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background-color: #566a83;
  color: #fff;
  height: 64px;
  line-height: 64px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-right {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.content {
  padding: 24px;
}

.inner-content {
  background: transparent;
  padding: 0;
  min-height: calc(100vh - 112px);
}

@media (max-width: 768px) {
  .dashboard-layout {
    font-size: 13px;
  }

  .header {
    padding: 0 16px;
    height: 56px;
    line-height: 56px;
  }
  
  .logo {
    font-size: 0.9rem;
  }
  
  .content {
    padding: 16px 12px;
  }
}

@media (max-width: 400px) {
  .header {
    padding: 0 10px;
  }
  
  .logo {
    font-size: 0.85rem;
  }
  
  .content {
    padding: 12px 8px;
  }
}
</style>
