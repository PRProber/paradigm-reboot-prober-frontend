<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n"

import { register } from "@/utils/api";
import { useUserStore } from "@/utils/store";

const userStore = useUserStore()
const i18n = useI18n()

const formRef = ref(null)
const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  email: ''
})

const emit = defineEmits(['register-success'])

const validatePassword = (rule, value, callback) => {
  if (value === '')
    callback(new Error(i18n.t('message.required')))
  else if (value !== form.password) {
    callback(new Error(i18n.t('message.password_mismatch')))
  } else {
    callback()
  }
}

const rules = reactive({
  username: [
    { required: true, message: i18n.t('message.required'), trigger: 'blur' },
    { pattern: /^[A-Za-z][A-Za-z0-9_]{6,12}$/, message: i18n.t('message.username_character'), trigger: 'blur' },
    { min: 6, max: 12, message: i18n.t('message.username_length'), trigger: 'blur'}
  ],
  password: [
    { required: true, message: i18n.t('message.required'), trigger: 'blur' },
    { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, message: i18n.t('message.password_character'), trigger: 'blur' },
    { min: 8, max: 20, message: i18n.t('message.password_length'), trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: i18n.t('message.required'), trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ],
  email: [
    { required: true, message: i18n.t('message.required'), trigger: 'blur' },
    { type: 'email', trigger: 'blur' }
  ]
})

const onSubmitRegisterForm = () => {
  register(form.username, form.email, form.password).then(() => {
    ElMessage({
      type: "success",
      message: i18n.t('message.register_success')
    })
    emit('register-success')
  }).catch((error) => {
    ElMessage({
      type: "error",
      message: i18n.t('message.register_failed') + error.response.data.detail
    })
  })
}
</script>

<template>
  <el-form ref="formRef" :model="form" label-width="auto" :rules="rules" status-icon>
    <el-form-item :label="$t('auth.username')" prop="username">
      <el-input v-model="form.username"/>
    </el-form-item>
    <el-form-item :label="$t('auth.email')" prop="email">
      <el-input v-model="form.email"/>
    </el-form-item>
    <el-form-item :label="$t('auth.password')" prop="password">
      <el-input v-model="form.password" type="password"/>
    </el-form-item>
    <el-form-item :label="$t('auth.confirm_password')" prop="confirmPassword">
      <el-input v-model="form.confirmPassword" type="password"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmitRegisterForm">{{ $t('common.submit') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>