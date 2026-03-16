=
<script setup>
import emitter from "../../eventBus";
import useUsersStore from "../../stores/usersStore";
import { ref } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";

const userStore = useUsersStore();
const selectedCountry = ref("");

const handleSelectCountry = (statId) => {
  if (selectedCountry.value === statId) {
    emitter.emit("allCountries");
    selectedCountry.value = "";
  } else {
    selectedCountry.value = statId;
    emitter.emit("changeNation", statId);
  }
};
</script>

<template>
  <a-row :gutter="[16, 16]" class="dashboard-row">
    <a-col :xs="24" :lg="10">
      <a-card class="dashboard-card total-card">
        <template #title>
          <div class="card-title">現在の在場人数</div>
        </template>

        <div class="total-content">
          <UserOutlined class="total-icon" />
          <h2 class="total-number">{{ userStore.totalUsers }}</h2>
          <span class="total-unit">人</span>
        </div>
      </a-card>
    </a-col>

    <a-col :xs="24" :lg="14">
      <a-card class="dashboard-card stat-card">
        <template #title>
          <div class="card-title text-left">国籍別内訳</div>
        </template>

        <div class="stats-row">
          <div
            v-for="stat in userStore.nationalityStats.slice(0, 4)"
            :key="stat.country"
            class="national-container"
            :class="{ 'active-country': stat.id === selectedCountry }"
            @click="handleSelectCountry(stat.id)"
          >
            <div class="stat-flag">
              <span :class="`fi fi-${stat.id.toLowerCase()}`"></span>
            </div>
            <div class="stat-name">{{ stat.country }}</div>
            <div class="stat-count">{{ stat.count }}</div>
          </div>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>
/* --- BASE LAYOUT (Desktop First) --- */
.dashboard-row {
  margin-bottom: 16px;
}

.dashboard-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
}

:deep(.ant-card-head) {
  min-height: auto;
  padding: 16px 24px;
}

:deep(.ant-card-head-title) {
  padding: 0;
}

:deep(.ant-card-body) {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.card-title {
  text-align: center;
  font-weight: 800;
  font-size: 16px;
}
.card-title.text-left {
  text-align: left;
}

/* --- CARD 1: TOTAL USERS --- */
.total-content {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 8px;
}

.total-icon {
  font-size: 56px;
  color: #9aadbf;
  margin-bottom: 8px;
}

.total-number {
  font-size: 80px;
  margin: 0;
  line-height: 1;
  font-weight: 700;
  color: #262626;
}

.total-unit {
  font-size: 32px;
  font-weight: 700;
  color: #262626;
  margin-bottom: 4px;
  margin-left: 4px;
}

/* --- CARD 2: NATIONALITY STATS --- */
.stat-card :deep(.ant-card-body) {
  overflow: hidden; /* Giữ scroll ngang gọn gàng */
  padding: 24px;
}

.stats-row {
  display: flex;
  gap: 12px;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: none;
}

.stats-row::-webkit-scrollbar {
  display: none;
}

.national-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #f5f5f5;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  white-space: nowrap;
  height: 80px;
  flex: 1;
  min-width: 150px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0 30px;
}

.national-container:hover {
  background-color: #e6f7ff;
  border-color: #91d5ff;
}

.national-container.active-country {
  background-color: #d9d9d9;
  border-color: #bfbfbf;
}

.stat-flag {
  font-size: 40px;
  display: flex;
  align-items: center;
}

.stat-flag span {
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.stat-name {
  font-size: 15px;
  font-weight: 500;
}

.stat-count {
  font-size: 40px;
  font-weight: 700;
}

/* --- RESPONSIVE MEDIA QUERIES --- */

/* Tablet & Màn hình nhỏ gọn (<= 1024px) */
@media (max-width: 1024px) {
  .total-number {
    font-size: 64px;
  }
  .total-icon {
    font-size: 48px;
  }
  .total-unit {
    font-size: 28px;
  }
  .national-container {
    height: 80px;
    min-width: 180px;
    gap: 6px;
    padding: 0 12px;
  }

  .stat-count {
    font-size: 32px;
  }
  .stat-flag {
    font-size: 32px;
  }
}

/* Mobile (<= 768px) */
@media (max-width: 768px) {
  :deep(.ant-card-head) {
    padding: 12px 16px;
  }
  :deep(.ant-card-body) {
    padding: 16px;
  }
  .stat-card :deep(.ant-card-body) {
    padding: 16px;
  }

  .total-number {
    font-size: 56px;
  }
  .total-icon {
    font-size: 40px;
    margin-bottom: 4px;
  }
  .total-unit {
    font-size: 24px;
    margin-bottom: 2px;
  }

  .national-container {
    height: 64px;
    min-width: 150px;
    gap: 6px;
    padding: 0 10px;
  }

  .stat-name {
    font-size: 13px;
  }
  .stat-count {
    font-size: 28px;
  }
  .stat-flag {
    font-size: 28px;
  }
}

/* Mobile nhỏ (<= 480px) */
@media (max-width: 480px) {
  :deep(.ant-card-body) {
    padding: 12px;
  }
  .stat-card :deep(.ant-card-body) {
    padding: 12px;
  }

  .total-number {
    font-size: 48px;
  }
  .total-icon {
    font-size: 32px;
    margin-bottom: 4px;
  }
  .total-unit {
    font-size: 20px;
    margin-bottom: 0px;
  }

  .national-container {
    height: 56px;
    min-width: 150px;
    border-radius: 8px;
    gap: 6px;
    padding: 0 8px;
  }

  .stat-name {
    font-size: 12px;
  }
  .stat-count {
    font-size: 24px;
  }
  .stat-flag {
    font-size: 24px;
  }
}
</style>
