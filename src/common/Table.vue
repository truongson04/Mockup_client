<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { PrinterOutlined, FileExcelOutlined } from "@ant-design/icons-vue";

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

const pagination = reactive({
  current: 1,
  pageSize: 5,
  pageSizeOptions: ["5", "10", "20", "50"],
  showSizeChanger: false,
  showTotal: (total, range) =>
    `全${total}件中${range[0]}～${range[1]}件を表示しています。`,
  onChange: (page, pageSize) => {
    pagination.current = page;
    pagination.pageSize = pageSize;
  },
});
</script>
<template>
  <Filter />

  <div class="table-container">
    <div class="table-controls">
      <div class="action-buttons">
        <a-space>
          <a-button type="primary" class="print-btn">
            <template #icon><PrinterOutlined /></template>
            印刷する
          </a-button>
          <a-button class="csv-btn">
            <template #icon><FileExcelOutlined /></template>
            CSVファイルにエクスポート
          </a-button>
        </a-space>
      </div>

      <div class="function-selector">
        <b>表示件数:</b>
        <a-select v-model:value="pagination.pageSize" style="width: 80px">
          <a-select-option
            v-for="size in pagination.pageSizeOptions"
            :key="size"
            :value="Number(size)"
          >
            {{ size }}
          </a-select-option>
        </a-select>
        <b>件</b>
      </div>
    </div>

    <a-table
      :dataSource="useStore.currentFilter"
      :columns="columns"
      :pagination="pagination"
      :row-class-name="getRowClassName"
      bordered
      size="middle"
      :scroll="{ x: 800 }"
    >
      <template #bodyCell="{ column, record }">
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
            style="width: 60px; display: flex; justify-content: center"
          >
            {{ record.action === "in" ? "入室" : "退室" }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'timeUse'">
          {{ record.timeUse.split(" ")[1].substring(0, 5) }}
        </template>
      </template>
    </a-table>
  </div>
</template>
<style scoped>
.table-container {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.table-controls {
  padding: 0 0 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background-color: #ffffff;
}

@media (max-width: 768px) {
  .table-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .action-buttons {
    width: 100%;
  }

  .action-buttons :deep(.ant-space) {
    width: 100%;
  }

  .action-buttons :deep(.ant-space-item) {
    flex: 1;
  }

  .print-btn,
  .csv-btn {
    width: 100%;
  }

  .function-selector {
    justify-content: flex-end;
    font-size: 12px;
    padding: 15px;
  }

  :deep(.ant-table) {
    font-size: 12px !important;
  }

  :deep(.ant-table-thead > tr > th) {
    padding: 8px !important;
  }

  :deep(.ant-table-tbody > tr > td) {
    padding: 8px !important;
  }
}

@media (max-width: 400px) {
  .table-container {
    padding: 12px;
  }

  .table-controls {
    gap: 12px;
  }

  .print-btn,
  .csv-btn {
    font-size: 11px;
    height: 34px;
  }

  :deep(.ant-table) {
    font-size: 11px !important;
  }

  :deep(.ant-pagination) {
    gap: 8px;
    align-items: center;
  }

  :deep(.ant-pagination-total-text) {
    margin-right: 0;
    margin-bottom: 4px;
  }
}
@media screen {
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.function-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #595959;
}

.print-btn {
  background-color: #2f5d86 !important;
  border-color: #2f5d86 !important;
}

.csv-btn {
  background-color: #2f5d86 !important;
  border-color: #2f5d86 !important;
  color: white;
}

.csv-btn:hover {
  background-color: #244b6b !important;
  border-color: #244b6b !important;
  color: white;
}

:deep(.ant-select-selector) {
  border-radius: 4px !important;
}

:deep(.ant-pagination) {
  margin: 12px 0 !important;
  display: flex;
  align-items: center;
}

:deep(.ant-pagination-total-text) {
  margin-right: auto;
  order: -1;
  font-weight: 700;
  color: #262626;
}

:deep(.table-row-even > td) {
  background-color: white;
}

:deep(.table-row-odd > td) {
  background-color: #f5f5f5;
}

:deep(.ant-table-tbody > tr.table-row-even:hover > td),
:deep(.ant-table-tbody > tr.table-row-odd:hover > td) {
  background-color: #f0f8ff;
}
:deep(.ant-table-thead > tr > th) {
  background-color: #e7eaef;
  border-top: 1px solid gray;
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
  border-color: gray;
}
</style>
