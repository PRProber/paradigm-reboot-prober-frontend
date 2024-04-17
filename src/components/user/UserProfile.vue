<script setup>
import { reactive, onMounted } from "vue";
import { useUserStore } from "@/utils/store";
import { Refresh } from "@element-plus/icons-vue";
import { refreshUploadToken, updateMyInfo } from "@/utils/api";
import {ElMessage} from "element-plus";
import { useI18n } from "vue-i18n";

const emit = defineEmits(['cancel'])
const i18n = useI18n()

const userStore = useUserStore()
const form = reactive({
  username: '',
  nickname: '',
  email: '',
  qq_number: 0,
  account: '',
  account_number: 0,
  uuid: '',
  anonymous_probe: false,
  upload_token: ''
})

onMounted(() => {
  form.username = userStore.profile.username
  form.nickname = userStore.profile.nickname
  form.email = userStore.profile.email
  form.qq_number = userStore.profile.qq_number
  form.account = userStore.profile.account
  form.account_number = userStore.profile.account_number
  form.uuid = userStore.profile.uuid
  form.anonymous_probe = userStore.profile.anonymous_probe
  form.upload_token = userStore.profile.upload_token
})

const onSave = () => {
  updateMyInfo(form).then((response) => {
    userStore.profile = response.data
    ElMessage({
      type: "success",
      message: i18n.t("message.update_profile_success")
    })
    emit('cancel')
  }).catch(() => {
    ElMessage({
      type: "error",
      message: i18n.t("message.update_profile_failed")
    })
  })
}

const onRefreshUploadToken = () => {
  refreshUploadToken().then((response) => {
    form.upload_token = response.data.upload_token
    ElMessage({
      type: 'success',
      message: i18n.t("message.refresh_upload_token_success")
    })
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: i18n.t("message.refresh_upload_token_failed")
    })
  })
}
</script>

<template>
  <el-form :model="form" label-width="auto">
    <el-form-item :label="$t('auth.username')">
      {{ form.username }}
    </el-form-item>
    <el-form-item :label="$t('auth.nickname')">
      <el-input v-model="form.nickname"/>
    </el-form-item>
    <el-form-item :label="$t('auth.upload_token')">
      <el-input v-model="form.upload_token" readonly>
        <template #append>
          <el-button :icon="Refresh" @click="onRefreshUploadToken"/>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('auth.email')">
      {{ form.email }}
    </el-form-item>
    <el-form-item :label="$t('auth.qq_number')">
      <el-input v-model.number="form.qq_number"></el-input>
    </el-form-item>
    <!--TODO: 添加游戏内相关数据-->
    <el-form-item :label="$t('auth.anonymous_probe')">
      <el-radio-group v-model="form.anonymous_probe">
        <el-radio :value="true">{{ $t('common.yes') }}</el-radio>
        <el-radio :value="false">{{ $t('common.no') }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSave">{{ $t('common.save') }}</el-button>
      <el-button @click="$emit('cancel')">{{ $t('common.cancel') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>