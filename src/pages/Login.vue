<script setup>
import { reactive } from "vue";
import Loading from "../common/Loading.vue";
import useUIStore from "../stores/UIStore";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { AppstoreOutlined } from "@ant-design/icons-vue";

const router = useRouter();
const UIStore = useUIStore();

const formStatus = reactive({
  email: "",
  password: "",
});

const onFinish = () => {
  UIStore.isLoading = true;

  setTimeout(() => {
    UIStore.isLoading = false;
    message.success("ログインに成功しました");
    router.push("/dashboard");
  }, 1000);
};

const handleForgotPassword = (e) => {
  e.preventDefault();
  message.info("パスワードリセット機能は現在準備中です。");
};
</script>

<template>
  <Loading v-if="UIStore.isLoading" />
  <div class="login-wrapper">
    <div class="split-container">
      <!-- Left side: Brand -->
      <div class="brand-side">
        <div class="brand-content">
          <div class="logo-circle">
            <AppstoreOutlined style="font-size: 32px; color: #2f5d86" />
          </div>
          <h1 class="brand-title">safie Entrance2</h1>
        </div>
      </div>

      <!-- Vertical Line -->
      <div class="vertical-line"></div>

      <!-- Right side: Form -->
      <div class="form-side">
        <div class="form-container">
          <h2 class="login-heading">ログイン</h2>

          <a-form
            :model="formStatus"
            layout="vertical"
            @finish="onFinish"
            class="login-form"
          >
            <a-form-item name="email">
              <template #label>
                <span class="custom-label"
                  >メールアドレス<span class="required-mark">*</span></span
                >
              </template>
              <a-input
                v-model:value="formStatus.email"
                size="large"
                class="form-input"
              />
            </a-form-item>

            <a-form-item name="password">
              <template #label>
                <span class="custom-label"
                  >パスワード<span class="required-mark">*</span></span
                >
              </template>
              <a-input-password
                v-model:value="formStatus.password"
                size="large"
                class="form-input"
              />
            </a-form-item>

            <a-form-item style="margin-top: 40px">
              <a-button
                type="primary"
                html-type="submit"
                block
                class="login-button"
              >
                ログイン
              </a-button>
            </a-form-item>

            <div class="help-links">
              <a @click="handleForgotPassword" class="forgot-link">
                パスワードを忘れた方はこちら
              </a>
            </div>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fbff;
  padding: 20px;
}

.split-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 900px;
  justify-content: center;
}

.brand-side {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 60px;
}

.brand-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid #d9e2ef;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: white;
}

.logo-circle img {
  width: 80%;
  height: 80%;
  object-fit: contain;
}

.brand-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #2f5d86;
  letter-spacing: 0.5px;
}

.vertical-line {
  width: 1px;
  height: 240px;
  background-color: #d9e2ef;
}

.form-side {
  flex: 1;
  padding-left: 60px;
}

.form-container {
  width: 100%;
  max-width: 380px;
}

.login-heading {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 40px;
}

.custom-label {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.required-mark {
  color: #d9363e;
  margin-left: 2px;
}

.form-input {
  border-radius: 4px;
  height: 44px;
}

.login-button {
  height: 48px;
  background-color: #3b4a6b !important;
  border-color: #3b4a6b !important;
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(59, 74, 107, 0.2);
}

.login-button:hover {
  background-color: #2c3852 !important;
  opacity: 0.9;
}

.help-links {
  text-align: center;
  margin-top: 20px;
}

.forgot-link {
  font-size: 12px;
  color: #2f5d86;
  text-decoration: underline;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
  .split-container {
    flex-direction: column;
  }

  .brand-side {
    padding-right: 0;
    margin-bottom: 40px;
    justify-content: center;
  }

  .vertical-line {
    display: none;
  }

  .form-side {
    padding-left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
