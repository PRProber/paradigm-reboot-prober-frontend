<script setup>
import { reactive } from "vue";
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
    { required: true, message: i18n.t('message.required'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: i18n.t('message.required'), trigger: 'blur' }
  ]
})

const onSubmitLoginForm = () => {
  login(form.username, form.password).then((response) => {
    userStore.$patch({
      logged_in: true,
      username: form.username.toLowerCase(),
      access_token: 'Bearer ' + response.data.access_token
    })
    ElMessage({
      'type': 'success',
      'message': i18n.t('message.login_success')
    })
    emit("login-success")
  }).catch((error) => {
    ElMessage({
      'type': 'error',
      'message': i18n.t('message.login_failed')
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