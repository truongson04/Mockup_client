<script setup>
import { computed, reactive, ref, watch } from "vue";
import dayjs from "dayjs";
import { FunnelPlotOutlined } from "@ant-design/icons-vue";
const userList = defineModel("userList");
const showFilterModal = ref(false);

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
const filterGender = ref(null);

const criteria = ref({});
const applyFilters = () => {
  criteria.value.name = searchQuery.value;
  criteria.value.timeStart = searchTime.value[0] || "";
  criteria.value.timeEnd = searchTime.value[1] || "";
  criteria.value.company = searchCompany.value;
  criteria.value.action = filterAction.value;
  criteria.value.gender = filterGender.value;
  showFilterModal.value = false;
};
const filteredUsers = computed(() => {
  let newUsers = userList.value;
  // search by user name
  if (criteria.value.name) {
    newUsers = newUsers.filter((user) =>
      user.name
        .toLowerCase()
        .trim()
        .includes(criteria.value.name.toLowerCase().trim()),
    );
  }

  //filter by time
  if (criteria.value.timeStart && criteria.value.timeEnd) {
    const startTime = dayjs(criteria.value.timeStart).format("HH:mm");
    const endTime = dayjs(criteria.value.timeEnd).format("HH:mm");
    newUsers = newUsers.filter(
      (user) => startTime <= user.timeUse && endTime >= user.timeUse,
    );
  }
  if (criteria.value.company) {
    newUsers = newUsers.filter(
      (user) =>
        user.tags
          .find((tag) => tag.startsWith("Company_"))
          .replace("Company_", "") === criteria.value.company,
    );
  }
  if (criteria.value.action) {
    newUsers = newUsers.filter((user) => user.action === criteria.value.action);
  }
  if (criteria.value.gender) {
    newUsers = newUsers.filter(
      (user) =>
        user.tags
          .find((tag) => tag.startsWith("Gender_"))
          .replace("Gender_", "") === criteria.value.gender,
    );
  }
  return newUsers;
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
    <a-button type="primary" @click="showFilterModal = true"
      ><FunnelPlotOutlined
    /></a-button>
    <a-modal
      v-model:open="showFilterModal"
      title="Filter"
      okText="Apply"
      cancelText="Cancel"
      @ok="applyFilters"
    >
      <a-form layout="vertical">
        <a-form-item label="Time Range">
          <a-time-range-picker
            v-model:value="searchTime"
            format="HH:mm"
            style="width: 100%"
          />
        </a-form-item>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Action">
              <a-select
                v-model:value="filterAction"
                placeholder="Chọn hành động"
                style="width: 100%"
                allowClear
              >
                <a-select-option value="">All</a-select-option>
                <a-select-option value="in">Arrive (In)</a-select-option>
                <a-select-option value="out">Leave (Out)</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="Gender">
              <a-select
                v-model:value="filterGender"
                placeholder="Select gender"
                style="width: 100%"
                allowClear
              >
                <a-select-option value="">All</a-select-option>
                <a-select-option value="Male">Male</a-select-option>
                <a-select-option value="Female">Female</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
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
        <a-tag :color="record.action === 'in' ? 'success' : 'error'">
          {{ record.action === "in" ? "Arrive" : "Leave" }}
        </a-tag>
      </template>
    </template>
  </a-table>
</template>
