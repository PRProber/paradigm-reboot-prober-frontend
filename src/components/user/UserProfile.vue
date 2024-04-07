<script setup>
import { reactive, onMounted } from "vue";
import { useUserStore } from "@/utils/store";
import { Refresh } from "@element-plus/icons-vue";

const emit = defineEmits(['cancel'])

const userStore = useUserStore()
const form = reactive({
  username: '',
  email: '',
  qq_number: 0,
  account: '',
  account_number: 0,
  uuid: '',
  anonymous_probe: false,
  upload_token: ''
})

onMounted(() => {
  const profile = userStore.profile
  form.username = profile.username
  form.email = profile.email
  form.qq_number = profile.qq_number
  form.account = profile.account
  form.account_number = profile.account_number
  form.uuid = profile.uuid
  form.anonymous_probe = profile.anonymous_probe
  form.upload_token = profile.upload_token
})

const onSave = () => {
  // TODO: Invoke update profile API
}

const onRefreshUploadToken = () => {
  // TODO: Implement this function and corresponding API
  console.log("Invoke refresh upload token API")
}
</script>

<template>
  <el-form :model="form" label-width="auto">
    <el-form-item :label="$t('auth.username')">
      <el-input v-model="form.username" readonly></el-input>
    </el-form-item>
    <el-form-item :label="$t('auth.upload_token')">
      <el-input v-model="form.upload_token" readonly>
        <template #append>
          <el-button :icon="Refresh" @click="onRefreshUploadToken"/>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('auth.email')">
      <el-input v-model="form.email" readonly></el-input>
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