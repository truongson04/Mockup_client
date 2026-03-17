<script setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { PrinterOutlined, FileExcelOutlined } from "@ant-design/icons-vue";

import Filter from "../components/Filter.vue";
import useUsersStore from "../stores/usersStore";

const windowWidth = ref(window.innerWidth);
const onResize = () => {
  windowWidth.value = window.innerWidth;
};
onMounted(() => window.addEventListener("resize", onResize));
onUnmounted(() => window.removeEventListener("resize", onResize));

const availableWidth = computed(() => {
  const w = windowWidth.value;
  if (w <= 400) return w - 16; // padding: 8px each side
  if (w <= 480) return w - 24; // padding: 12px each side
  if (w <= 768) return w - 32; // padding: 16px each side
  if (w <= 1024) return w - 48; // padding: 24px each side
  return w;
});

const columns = computed(() => {
  const isMobileOrTablet = windowWidth.value <= 1024;
  const col1Width = isMobileOrTablet
    ? Math.floor(availableWidth.value * 0.38)
    : 120;
  const col2Width = isMobileOrTablet
    ? Math.floor(availableWidth.value * 0.62)
    : 200;

  return [
    { title: "氏名", dataIndex: "name", key: "name", width: col1Width },
    { title: "電子メール", dataIndex: "email", key: "email", width: col2Width },
    { title: "会社名", key: "company", width: 150 },
    {
      title: "アクション（入室／退室）",
      dataIndex: "action",
      key: "action",
      width: 160,
    },
    { title: "入場時刻", dataIndex: "timeUse", key: "timeUse", width: 120 },
  ];
});

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
        <a-button type="primary" class="print-btn">
          <template #icon><PrinterOutlined /></template>
          <span>印刷する</span>
        </a-button>
        <a-button class="csv-btn">
          <template #icon><FileExcelOutlined /></template>
          <span>CSVファイルにエクスポート</span>
        </a-button>
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

    <div class="table-responsive-wrapper">
      <a-table
        :dataSource="useStore.currentFilter"
        :columns="columns"
        :pagination="pagination"
        :row-class-name="getRowClassName"
        bordered
        size="middle"
        :scroll="{ x: 'max-content' }"
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
  </div>
</template>

<style scoped>
.table-container {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  width: 100%;
  box-sizing: border-box;
  overflow-y: hidden;
  overflow-x: visible;
}

.table-controls {
  padding-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.table-responsive-wrapper {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.function-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #595959;
  white-space: nowrap;
}

.print-btn,
.csv-btn {
  background-color: #2f5d86 !important;
  border-color: #2f5d86 !important;
  color: white !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.csv-btn:hover,
.print-btn:hover {
  background-color: #244b6b !important;
  border-color: #244b6b !important;
}

:deep(.ant-select-selector) {
  border-radius: 4px !important;
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
  white-space: nowrap;
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

:deep(.ant-pagination) {
  margin: 16px 0 0 0 !important;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
:deep(.ant-pagination-total-text) {
  flex: 1 1 100%;
  font-weight: 700;
  color: #262626;
  margin-right: 0;
}

@media (max-width: 768px) {
  .table-container {
    padding: 16px;
  }

  .table-controls {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .action-buttons {
    flex-direction: column;
    width: 100%;
  }

  .print-btn,
  .csv-btn {
    width: 100%;
  }

  .function-selector {
    justify-content: flex-start;
  }

  :deep(.ant-pagination) {
    justify-content: center;
  }
  :deep(.ant-pagination-total-text) {
    text-align: center;
    margin-bottom: 8px;
  }
}

@media (max-width: 480px) {
  .table-container {
    padding: 12px;
  }

  .print-btn,
  .csv-btn {
    font-size: 13px;
    height: 36px;
  }

  :deep(.ant-table) {
    font-size: 13px !important;
  }

  :deep(.ant-table-thead > tr > th),
  :deep(.ant-table-tbody > tr:not(.ant-table-measure-row) > td) {
    padding: 12px 8px !important;
    white-space: nowrap !important;
  }
}

@media (max-width: 400px) {
  .table-container {
    padding: 8px;
  }

  .action-buttons {
    gap: 4px;
  }

  .print-btn,
  .csv-btn {
    font-size: 11px;
    height: 30px;
    padding: 0 4px;
  }

  .function-selector {
    font-size: 11px;
  }

  :deep(.ant-table) {
    font-size: 11px !important;
  }

  :deep(.ant-table-thead > tr > th),
  :deep(.ant-table-tbody > tr:not(.ant-table-measure-row) > td) {
    padding: 10px 8px !important;
    white-space: nowrap !important;
  }
}

@media (min-width: 769px) {
  :deep(.ant-pagination) {
    justify-content: flex-end;
  }
  :deep(.ant-pagination-total-text) {
    flex: 1;
  }
}
</style>
