<script setup>
import useUsersStore from "../stores/usersStore";
import { ref, computed, reactive, onMounted } from "vue";
import dayjs from "dayjs";
import {
  SearchOutlined,
  ReloadOutlined,
  UserOutlined,
  BankOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons-vue";
import emitter from "../eventBus";
const searchQuery = ref("");
const searchCompany = ref("");
const searchTime = ref([]);
const searchDate = ref([]);
const filterAction = ref(null);
const filterGender = ref(null);

const criteria = reactive({
  name: "",
  company: "",
  time: [],
  date: [],
  action: null,
  gender: null,
  nation: null,
});
const userStore = useUsersStore();

const handleClearFilters = () => {
  searchQuery.value = "";
  searchCompany.value = "";
  searchTime.value = [];
  searchDate.value = [];
  filterAction.value = null;
  filterGender.value = null;
};

const hasFilterChanges = computed(() => {
  const currentCriteriaTime = criteria.time || [];
  const currentTime = searchTime.value || [];

  const currentCriteriaDate = criteria.date || [];
  const currentDate = searchDate.value || [];

  const timeChanged =
    currentTime[0] !== currentCriteriaTime[0] ||
    currentTime[1] !== currentCriteriaTime[1];

  const dateChanged =
    currentDate[0] !== currentCriteriaDate[0] ||
    currentDate[1] !== currentCriteriaDate[1];

  return (
    timeChanged ||
    dateChanged ||
    filterAction.value !== criteria.action ||
    filterGender.value !== criteria.gender ||
    searchQuery.value !== criteria.name ||
    searchCompany.value !== criteria.company
  );
});

const filteredUsers = computed(() => {
  let newUsers = userStore.userList;
  //filter by name(instantly)

  if (criteria.name) {
    newUsers = newUsers.filter((user) =>
      user.name
        .toLowerCase()
        .trim()
        .includes(searchQuery.value.toLowerCase().trim()),
    );
  }
  // filter by time

  if (criteria.time?.[0] && criteria.time?.[1]) {
    const startTime = dayjs(criteria.time[0]).format("HH:mm");
    const endTime = dayjs(criteria.time[1]).format("HH:mm");
    newUsers = newUsers.filter((user) => {
      const userTime = user.timeUse.split(" ")[1].substring(0, 5);
      return startTime <= userTime && endTime >= userTime;
    });
  }

  // filter by date range
  if (criteria.date?.[0] && criteria.date?.[1]) {
    const startDate = dayjs(criteria.date[0]).startOf("day");
    const endDate = dayjs(criteria.date[1]).endOf("day");
    newUsers = newUsers.filter((user) => {
      const userDate = dayjs(user.timeUse.split(" ")[0]);
      return (
        (userDate.isSame(startDate) || userDate.isAfter(startDate)) &&
        (userDate.isSame(endDate) || userDate.isBefore(endDate))
      );
    });
  }

  // filter by company (instant filtering)
  if (criteria.company) {
    newUsers = newUsers.filter((user) => {
      const tag = user.tags?.find((tag) => tag.startsWith("Company_"));
      return tag && tag.replace("Company_", "") === searchCompany.value;
    });
  }

  if (criteria.action) {
    newUsers = newUsers.filter((user) => user.action === criteria.action);
  }

  if (criteria.gender) {
    newUsers = newUsers.filter((user) => {
      const tag = user.tags?.find((tag) => tag.startsWith("Gender_"));
      return tag && tag.replace("Gender_", "") === criteria.gender;
    });
  }
  // filter by nation
  if (criteria.nation) {
    newUsers = newUsers.filter((user) => {
      const tag = user.tags?.find((tag) => tag.startsWith("Nationality_"));
      return tag && tag.replace("Nationality_", "") === criteria.nation;
    });
  }

  return newUsers;
});
const handleSearch = () => {
  criteria.name = searchQuery.value;
  criteria.company = searchCompany.value;
  criteria.time = searchTime.value ? [...searchTime.value] : [];
  criteria.date = searchDate.value ? [...searchDate.value] : [];
  criteria.action = filterAction.value;
  criteria.gender = filterGender.value;

  userStore.setFilteredUsers(filteredUsers.value);
};
onMounted(() => {
  emitter.on("changeNation", (nationId) => {
    criteria.nation = nationId;
    userStore.setFilteredUsers(filteredUsers.value);
  });
  emitter.on("allCountries", () => {
    criteria.nation = "";
    userStore.setFilteredUsers(filteredUsers.value);
  });
});
</script>
<template>
  <div class="filter-wrapper">
    <a-form layout="vertical" class="filter-form">
      <a-row :gutter="[24, 16]">
        <!-- search by name form  -->
        <a-col :span="24">
          <a-row :gutter="24">
            <a-col :xs="24" :md="12">
              <a-form-item label="氏名">
                <a-input
                  v-model:value="searchQuery"
                  placeholder="名前やメールで検索..."
                  allow-clear
                >
                  <template #prefix>
                    <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                  </template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12">
              <a-form-item label="会社名">
                <a-input
                  v-model:value="searchCompany"
                  placeholder="会社名を入力..."
                  allow-clear
                >
                  <template #prefix>
                    <BankOutlined style="color: rgba(0, 0, 0, 0.25)" />
                  </template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <!-- search by time range  -->
        <a-col :xs="24" :md="6">
          <a-form-item label="時間範囲">
            <a-time-range-picker
              v-model:value="searchTime"
              format="HH:mm"
              style="width: 100%"
              :placeholder="['開始', '終了']"
            >
              <template #suffixIcon>
                <ClockCircleOutlined />
              </template>
            </a-time-range-picker>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="6">
          <a-form-item label="日付範囲">
            <a-range-picker
              v-model:value="searchDate"
              format="YYYY-MM-DD"
              style="width: 100%"
              :placeholder="['開始日', '終了日']"
            >
              <template #suffixIcon>
                <CalendarOutlined />
              </template>
            </a-range-picker>
          </a-form-item>
        </a-col>
        <!-- search by action -->

        <a-col :xs="24" :md="6">
          <a-form-item label="アクション">
            <a-select
              v-model:value="filterAction"
              placeholder="アクション"
              allowClear
            >
              <a-select-option value="">全て表示</a-select-option>
              <a-select-option value="in">到着 (IN)</a-select-option>
              <a-select-option value="out">退室 (OUT)</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <!-- search by gender  -->
        <a-col :xs="24" :md="6">
          <a-form-item label="性別">
            <a-select
              v-model:value="filterGender"
              placeholder="性別を選択"
              allowClear
            >
              <a-select-option value="">全て表示</a-select-option>
              <a-select-option value="Male">男性</a-select-option>
              <a-select-option value="Female">女性</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <!-- apply button  -->
        <a-col :span="24" class="action-buttons-col">
          <transition name="filter-fade">
            <div v-if="hasFilterChanges" class="filter-actions-inline">
              <a-space>
                <a-tooltip title="フィルターをリセット">
                  <a-button @click="handleClearFilters" class="reset-btn">
                    <template #icon><ReloadOutlined /></template>
                  </a-button>
                </a-tooltip>
                <a-button
                  type="primary"
                  @click="handleSearch"
                  class="apply-btn"
                >
                  <template #icon><SearchOutlined /></template>
                  フィルター適用
                </a-button>
              </a-space>
            </div>
          </transition>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<style scoped>
.filter-wrapper {
  margin-bottom: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  transition: all 0.3s ease;
}

.filter-wrapper:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #d1d1d1;
}

.filter-header {
  padding: 12px 24px;
  background-color: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  color: #262626;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-form {
  padding: 24px;
}

.action-buttons-col {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-bottom: 4px;
}

.filter-actions-inline {
  display: flex;
  gap: 12px;
}

.apply-btn {
  background-color: #001529 !important;
  border-color: #001529 !important;
  font-weight: 500;
  padding: 4px 20px;
  height: 38px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 21, 41, 0.2);
}

.apply-btn:hover {
  background-color: #002140 !important;
  border-color: #002140 !important;
  transform: translateY(-1px);
}

.reset-btn {
  height: 38px;
  border-radius: 6px;
  color: #595959;
}

.reset-btn:hover {
  color: #ff4d4f;
  border-color: #ff4d4f;
}

@media (max-width: 1024px) {
  .filter-form {
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .filter-form {
    padding: 16px;
  }

  .action-buttons-col {
    justify-content: stretch;
  }

  .filter-actions-inline {
    width: 100%;
    gap: 8px;
  }

  .filter-actions-inline :deep(.ant-space) {
    width: 100%;
  }

  .filter-actions-inline :deep(.ant-space-item) {
    flex: 1 1 0;
  }

  .apply-btn,
  .reset-btn {
    width: 100%;
  }

  :deep(.ant-form-item) {
    margin-bottom: 12px;
  }
}

@media (max-width: 480px) {
  .filter-form {
    padding: 12px;
  }

  .filter-actions-inline {
    flex-direction: column;
    gap: 10px;
  }
}

:deep(.ant-form-item-label > label) {
  font-weight: 500;
  color: #595959;
  font-size: 13px;
}

:deep(.ant-input),
:deep(.ant-select-selector),
:deep(.ant-picker) {
  border-radius: 6px !important;
}

.filter-fade-enter-active,
.filter-fade-leave-active {
  transition: all 0.4s ease;
  max-height: 100px;
  opacity: 1;
}

.filter-fade-enter-from,
.filter-fade-leave-to {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
}
</style>
