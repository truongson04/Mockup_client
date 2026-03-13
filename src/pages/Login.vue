<script setup>
import { reactive, ref } from "vue";
import Loading from "../common/Loading.vue";
import useUIStore from "../stores/UIStore";
import { MailOutlined, LockOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

const formStatus = reactive({
  email: "",
  password: "",
  remember: true,
});

const UIStore = useUIStore();
const onFinish = () => {
  UIStore.isLoading = true;
};
</script>
<template>
  <Loading v-if="UIStore.isLoading" />
  <div class="login-wrapper">
    <div class="login-card">
      <div class="login-header">
        <h2>おかえり</h2>
        <p>サインインするには詳細を入力してください。</p>
      </div>

      <a-form
        name="basic"
        :model="formStatus"
        layout="vertical"
        @finish="onFinish"
      >
        <a-form-item
          label="電子メール"
          name="email"
          :rules="[
            { required: true, message: 'メールアドレスを入力してください' },
            {
              type: 'email',
              message: '有効なメールアドレスを入力してください',
            },
          ]"
        >
          <a-input
            v-model:value="formStatus.email"
            size="large"
            placeholder="メールアドレスを入力してください"
          >
            <template #prefix>
              <MailOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="パスワード"
          name="password"
          :rules="[{ required: true, message: 'パスワードを入力してください' }]"
        >
          <a-input-password
            v-model:value="formStatus.password"
            size="large"
            placeholder="••••••••"
          >
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input-password>
        </a-form-item>

        <div class="form-actions">
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formStatus.remember">
              私を覚えてますか
            </a-checkbox>
          </a-form-item>
          <a class="forgot-password" href="#">パスワードをお忘れですか？</a>
        </div>

        <a-form-item style="margin-top: 24px">
          <a-button type="primary" html-type="submit" size="large" block>
            サインイン
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  padding: 40px 32px;
  border-radius: 12px;

  box-shadow: 0 8px 24px rgba(149, 157, 165, 0.2);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: #1f1f1f;
}

.login-header p {
  margin: 8px 0 0;
  color: #8c8c8c;
  font-size: 14px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.forgot-password {
  font-size: 14px;
  color: #1890ff;
  transition: color 0.3s;
}

.forgot-password:hover {
  color: #40a9ff;
}
</style>
