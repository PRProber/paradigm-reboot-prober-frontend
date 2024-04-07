<script setup>
import { reactive, defineEmits } from "vue";
import { useI18n } from "vue-i18n";

import { login } from "@/utils/api";
import { useUserStore } from "@/utils/store";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const i18n = useI18n()

const emit = defineEmits(['login-success'])

const form = reactive({
  username: '',
  password: ''
});

const rules = reactive({
  username: [
    { required: true }
  ],
  password: [
    { required: true }
  ]
})

const onSubmitLoginForm = () => {
  login(form.username, form.password).then((response) => {
    userStore.logged_in = true
    userStore.username = form.username
    userStore.access_token = response.data.access_token
    ElMessage({
      'type': 'success',
      'message': i18n.t('message.login_success')
    })
    emit("login-success")
  }).catch((error) => {
    ElMessage({
      'type': 'error',
      'message': i18n.t('message.login_failed') + error.response.data.detail
    })
  })
}
</script>

<template>
  <el-form :model="form" label-width="auto" :rules="rules" status-icon>
    <el-form-item :label="$t('auth.username')" prop="username">
      <el-input v-model="form.username"/>
    </el-form-item>
    <el-form-item :label="$t('auth.password')" prop="password">
      <el-input v-model="form.password" type="password"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmitLoginForm">{{ $t('common.submit') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>