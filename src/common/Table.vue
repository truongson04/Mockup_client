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
              style="
                width: 60px;
                display: flex;
                justify-content: center;
                margin: 0 auto;
              "
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
/* 1. Base Styles (Desktop First but fluid) */
.table-container {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  width: 100%;
  box-sizing: border-box;
  overflow: hidden; /* Ngăn scroll toàn trang, giữ scroll trong bảng */
}

.table-controls {
  padding-bottom: 16px;
  display: flex;
  flex-wrap: wrap; /* Cho phép rớt dòng nếu thiếu không gian */
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.function-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #595959;
  white-space: nowrap; /* Không cho rớt dòng chữ "Hiển thị x kiện" */
}

/* Custom Button Colors */
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

/* Ant Design Table Overrides */
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
  white-space: nowrap; /* Tránh rớt dòng ở tiêu đề bảng */
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

/* Flexbox cho Pagination (Phân trang) */
:deep(.ant-pagination) {
  margin: 16px 0 0 0 !important;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
:deep(.ant-pagination-total-text) {
  flex: 1 1 100%; /* Chiếm 1 dòng riêng ở Mobile, đẩy các nút sang dòng dưới */
  font-weight: 700;
  color: #262626;
  margin-right: 0;
}

/* --- RESPONSIVE MEDIA QUERIES --- */

/* Tablet & Nhỏ hơn (<= 768px) */
@media (max-width: 768px) {
  .table-container {
    padding: 16px;
  }

  .table-controls {
    flex-direction: column;
    align-items: stretch; /* Kéo giãn các phần tử ra full chiều ngang */
    gap: 12px;
  }

  .action-buttons {
    flex-direction: column; /* Các nút xếp dọc */
    width: 100%;
  }

  .print-btn,
  .csv-btn {
    width: 100%;
  }

  .function-selector {
    justify-content: flex-end; /* Đẩy phần chọn số lượng sang phải */
  }

  /* Đẩy phần tổng số trang xuống và căn giữa các nút bấm */
  :deep(.ant-pagination) {
    justify-content: center;
  }
  :deep(.ant-pagination-total-text) {
    text-align: center;
    margin-bottom: 8px;
  }
}

/* Điện thoại di động nhỏ (<= 480px) */
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
  :deep(.ant-table-tbody > tr > td) {
    padding: 12px 8px !important; /* Thu nhỏ padding ô để hiển thị được nhiều nội dung hơn */
  }
}

/* Màn hình Desktop lớn (>= 769px) - Đưa text phân trang sang bên trái */
@media (min-width: 769px) {
  :deep(.ant-pagination) {
    justify-content: flex-end;
  }
  :deep(.ant-pagination-total-text) {
    flex: 1; /* Đẩy các nút sang sát lề phải */
  }
}
</style>
