<script setup>
import { computed, ref } from "vue";

const userList = defineModel("userList");

const columns = [
  {
    title: "Number",
    key: "index",
    align: "center",
    width: 60,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Company name",
    key: "company",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
  {
    title: "Time Use",
    dataIndex: "timeUse",
    key: "timeUse",
  },
];
const searchQuery = ref("");
const searchCompany = ref("");
const searchTime = ref([]);
const filterAction = ref(null);

const appliedSearchQuery = ref("");
const appliedSearchCompany = ref("");
const appliedSearchTime = ref([]);
const appliedFilterAction = ref(null);

const applyFilters = () => {
  appliedSearchQuery.value = searchQuery.value;
  appliedSearchCompany.value = searchCompany.value;
  appliedSearchTime.value = searchTime.value;
  appliedFilterAction.value = filterAction.value;
};

const filteredUsers = computed(() => {
  if (!userList.value) return [];

  return userList.value.filter((user) => {
    const isNameMatch = user.name
      ?.toLowerCase()
      .includes(appliedSearchQuery.value.toLowerCase());

    const companyName =
      user.tags
        ?.find((t) => t.startsWith("Company_"))
        ?.replace("Company_", "") || "N/A";
    const isCompanyMatch = companyName
      .toLowerCase()
      .includes(appliedSearchCompany.value.toLowerCase());

    let isTimeMatch = true;
    if (appliedSearchTime.value && appliedSearchTime.value.length === 2 && user.timeUse) {
      const timeParts = user.timeUse.split(':');
      if (timeParts.length === 2) {
        const userTotalMinutes =
          parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);

        const startTotalMinutes =
          appliedSearchTime.value[0].hour() * 60 + appliedSearchTime.value[0].minute();
        const endTotalMinutes =
          appliedSearchTime.value[1].hour() * 60 + appliedSearchTime.value[1].minute();

        isTimeMatch =
          userTotalMinutes >= startTotalMinutes &&
          userTotalMinutes <= endTotalMinutes;
      } else {
        isTimeMatch = false;
      }
    }

    const isActionMatch = appliedFilterAction.value
      ? user.action === appliedFilterAction.value
      : true;

    return isNameMatch && isCompanyMatch && isTimeMatch && isActionMatch;
  });
});
</script>
<template>
  <div style="margin-bottom: 16px; display: flex; gap: 16px; flex-wrap: wrap">
    <a-input
      placeholder="Search name..."
      v-model:value="searchQuery"
      style="width: 200px"
    />
    <a-input
      placeholder="Search company..."
      v-model:value="searchCompany"
      style="width: 200px"
    />
    <a-time-range-picker
      v-model:value="searchTime"
      format="HH:mm"
      style="width: 250px"
      allowClear
    />
    <a-select
      v-model:value="filterAction"
      placeholder="Filter Action"
      style="width: 150px"
      allowClear
    >
      <a-select-option value="in">Arrive (In)</a-select-option>
      <a-select-option value="out">Leave (Out)</a-select-option>
    </a-select>
    <a-button type="primary" @click="applyFilters">Apply Filter</a-button>
  </div>
  <a-table :dataSource="filteredUsers" :columns="columns">
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'index'">
        {{ index + 1 }}
      </template>
      <template v-else-if="column.key === 'company'">
        {{
          record.tags
            ?.find((t) => t.startsWith("Company_"))
            ?.replace("Company_", "") || "N/A"
        }}
      </template>
      <template v-else-if="column.key === 'action'">
        <a-tag :color="record.action === 'in' ? 'success' : 'warning'">
          {{ record.action === "in" ? "Arrive" : "Leave" }}
        </a-tag>
      </template>
    </template>
  </a-table>
</template>
