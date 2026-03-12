<script setup>
import { reactive, ref } from "vue";
import Loading from "../common/Loading.vue";
import useUIStore from "../stores/UIStore";

const formStatus = reactive({
  email: "",
  password: "",
  remember: true,
});
const loading = ref(false);
const UIStore = useUIStore();
const onFinish = () => {
  UIStore.isLoading = true;
};
</script>
<template>
  <Loading v-if="UIStore.isLoading" />
  <a-flex :style="{ height: '100vh' }" align="center" justify="center">
    <a-form
      name="basic"
      :model="formStatus"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 14 }"
      labelAlign="left"
      :style="{
        boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px',
        paddingTop: '200px',
        paddingLeft: '30px',
        paddingRight: '30px',
        height: '50%',
        width: '50%',
        borderRadius: '15px',
      }"
      @finish="onFinish"
    >
      <a-form-item
        label="Email"
        name="email"
        :rules="[{ required: true, message: 'Please type your email' }]"
      >
        <a-input v-model:value="formStatus.email" />
      </a-form-item>
      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formStatus.password" />
      </a-form-item>
      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formStatus.remember"
          >Remember me</a-checkbox
        >
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Login</a-button>
      </a-form-item>
    </a-form>
  </a-flex>
</template>
