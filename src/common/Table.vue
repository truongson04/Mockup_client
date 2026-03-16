<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";

import Filter from "../components/Filter.vue";
import useUsersStore from "../stores/usersStore";

const columns = [
  {
    title: "氏名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "電子メール",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "会社名",
    key: "company",
  },
  {
    title: "アクション（入室／退室）",
    dataIndex: "action",
    key: "action",
  },
  {
    title: "入場時刻",
    dataIndex: "timeUse",
    key: "timeUse",
  },
];

const getRowClassName = (record, index) => {
  return index % 2 === 0 ? "table-row-even" : "table-row-odd";
};
const useStore = useUsersStore();
</script>
<template>
  <Filter />

  <a-table
    :dataSource="useStore.currentFilter"
    :columns="columns"
    :pagination="{ pageSize: 5 }"
    :row-class-name="getRowClassName"
    bordered
  >
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'company'">
        {{
          record.tags
            ?.find((t) => t.startsWith("Company_"))
            ?.replace("Company_", "") || "N/A"
        }}
      </template>
      <template v-else-if="column.key === 'action'">
        <a-tag
          :color="record.action === 'in' ? 'success' : 'error'"
          style="width: 60px"
        >
          {{ record.action === "in" ? "到着" : "離れる" }}
        </a-tag>
      </template>
      <template v-else-if="column.key === 'timeUse'">
        {{ record.timeUse.split(" ")[1].substring(0, 5) }}
      </template>
    </template>
  </a-table>
</template>
<style scoped>
:deep(.table-row-even > td) {
  background-color: white;
}

:deep(.table-row-odd > td) {
  background-color: #eaebf0;
}

:deep(.ant-table-tbody > tr.table-row-even:hover > td),
:deep(.ant-table-tbody > tr.table-row-odd:hover > td) {
  background-color: #f0f8ff;
}
:deep(.ant-table.ant-table-bordered > .ant-table-container),
:deep(
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > thead
    > tr
    > th
),
:deep(
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > tbody
    > tr
    > td
) {
  border-color: #d9d9d9;
}
</style>
