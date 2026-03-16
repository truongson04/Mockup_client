<script setup>
import emitter from "../../eventBus";
import useUsersStore from "../../stores/usersStore";
import { ref } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";

const userStore = useUsersStore();
const selectedCountry = ref("");
</script>
<template>
  <a-row :gutter="[16, 16]" style="margin-bottom: 16px">
    <a-col :xs="24" :lg="10">
      <a-card
        style="
          height: 100%;
          display: flex;
          flex-direction: column;
          border-radius: 12px;
        "
        :headStyle="{ fontWeight: '800' }"
        :bodyStyle="{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }"
      >
        <template #title>
          <div style="text-align: center; font-weight: 800; font-size: 16px">
            現在の在場人数
          </div>
        </template>
        <div
          style="
            display: flex;
            align-items: flex-end;
            justify-content: center;
            gap: 8px;
          "
        >
          <UserOutlined
            style="font-size: 56px; color: #9aadbf; margin-bottom: 8px"
          />
          <h2
            style="
              font-size: 80px;
              margin: 0;
              line-height: 1;
              font-weight: 700;
              color: #262626;
            "
          >
            {{ userStore.totalUsers }}
          </h2>
          <span
            style="
              font-size: 32px;
              font-weight: 700;
              color: #262626;
              margin-bottom: 0px;
              margin-left: 4px;
            "
            >人</span
          >
        </div>
      </a-card>
    </a-col>

    <a-col :xs="24" :lg="14">
      <a-card
        style="
          height: 100%;
          display: flex;
          flex-direction: column;
          border-radius: 12px;
        "
        :headStyle="{ fontWeight: '800' }"
        :bodyStyle="{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          padding: '24px',
        }"
      >
        <template #title>
          <div style="font-weight: 800; font-size: 16px">国籍別内訳</div>
        </template>

        <div
          style="
            display: flex;
            gap: 12px;
            width: 100%;
            overflow-x: auto;
            padding-bottom: 8px;
            scrollbar-width: none;
          "
          class="stats-row"
        >
          <div
            class="national-container"
            v-for="stat in userStore.nationalityStats.slice(0, 4)"
            :key="stat.country"
            :style="{
              backgroundColor: stat.id === selectedCountry ? 'grey' : '#f5f5f5',
            }"
            @click="
              () => {
                if (selectedCountry === stat.id) {
                  emitter.emit('allCountries');
                  selectedCountry = '';
                } else {
                  selectedCountry = stat.id;
                  emitter.emit('changeNation', stat.id);
                }
              }
            "
          >
            <div style="font-size: 48px; display: flex; align-items: center">
              <span
                :class="`fi fi-${stat.id.toLowerCase()}`"
                style="
                  border-radius: 4px;
                  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                "
              ></span>
            </div>
            <div style="font-size: 15px; font-weight: 500">
              {{ stat.country }}
            </div>
            <div style="font-size: 48px; font-weight: 700">
              {{ stat.count }}
            </div>
          </div>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>
<style scoped>
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
  min-width: 140px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.national-container:hover {
  background-color: #e6f7ff;
  border-color: #91d5ff;
}

@media (max-width: 768px) {
  .national-container {
    height: 70px;
    min-width: 120px;
  }

  .national-container div {
    font-size: 0.9em !important;
  }

  /* Reduce large number sizes for mobile */
  :deep(.ant-card-body) h2 {
    font-size: 60px !important;
  }

  :deep(.ant-card-body) span {
    font-size: 24px !important;
  }
}

@media (max-width: 400px) {
  :deep(.ant-card-body) {
    padding: 12px !important;
  }

  :deep(.ant-card-body) h2 {
    font-size: 48px !important;
  }

  :deep(.ant-card-body) span {
    font-size: 20px !important;
  }

  .national-container {
    height: 60px;
    min-width: 100px;
    border-radius: 8px;
  }

  .national-container div {
    font-size: 0.8em !important;
  }
}

.stats-row::-webkit-scrollbar {
  display: none;
}
</style>
