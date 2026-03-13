<script setup>
import emitter from "../../eventBus";
import useUsersStore from "../../stores/usersStore";
import { ref } from "vue";

const userStore = useUsersStore();
const selectedCountry = ref("");
</script>
<template>
  <a-row
    :gutter="16"
    style="margin-bottom: 24px; display: flex; align-items: stretch"
  >
    <a-col :span="10">
      <a-card
        style="height: 100%; display: flex; flex-direction: column"
        :bodyStyle="{
          flex: 1,
          display: flex,
          alignItems: 'center',
          justifyContent: 'center',
        }"
      >
        <template #title>
          <h3 style="margin: 0; text-align: center">現在の在場人数</h3>
        </template>
        <h2
          style="
            font-size: 100px;
            margin: 0;
            text-align: center;
            line-height: 1;
          "
        >
          {{ userStore.totalUsers }}
        </h2>
      </a-card>
    </a-col>

    <a-col :span="14">
      <a-card
        style="height: 100%; display: flex; flex-direction: column"
        :bodyStyle="{
          flex: 1,
          display: flex,
          alignItems: 'center',
          overflow: 'hidden',
        }"
      >
        <template #title>
          <h3 style="margin: 0">国籍別内訳</h3>
        </template>

        <div
          style="
            display: flex;
            gap: 12px;
            overflow-x: auto;
            width: 100%;
            padding-bottom: 8px;
          "
        >
          <div
            class="national-container"
            v-for="stat in userStore.nationalityStats"
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
            <div style="font-size: 60px; display: flex; align-items: center">
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
            <div style="font-size: 18px; font-weight: bold">
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
  gap: 12px;
  padding: 5px 16px;
  background-color: #f5f5f5;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  white-space: nowrap;
  height: 100px;
  width: 400px;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.national-container:hover {
  background-color: grey;
}
</style>
