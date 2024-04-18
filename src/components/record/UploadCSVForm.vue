<script setup>
import { ref, reactive } from 'vue'
import {postCsvRecord, uploadCsvUrl} from "@/utils/api";
import {ElMessage, genFileId} from 'element-plus'
import {useUserStore} from "@/utils/store";
import {useI18n} from "vue-i18n";

const upload = ref(null)
const userStore = useUserStore()
const emit = defineEmits(['success'])
const i18n = useI18n()
const headers = reactive({
  'Authorization': userStore.access_token
})

const handleExceed = (files) => {
  if (upload.value !== null) {
    upload.value.clearFiles()
    const file = files[0]
    file.uid = genFileId()
    upload.value.handleStart(file)
  }
}

const submitUpload = () => {
  upload.value.submit()
}

const onFailed = () => {
  ElMessage({
    type: 'error',
    message: i18n.t('message.post_record_failed')
  })
}

const onSuccess = (response) => {
  const filename = response.filename
  postCsvRecord(userStore.username, filename).then(() => {
    ElMessage({
      type: 'success',
      message: i18n.t('message.post_record_success')
    })
    emit('success')
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: i18n.t('message.post_record_failed')
    })
  })
}

</script>

<template>
  <el-row>
    <el-text>{{$t("message.upload_csv_info")}}</el-text>
  </el-row>
  <el-row justify="center" style="margin-top: 1em">
    <el-col>
      <el-upload
          ref="upload"
          class="upload-demo"
          :action="uploadCsvUrl"
          :limit="1"
          :headers="headers"
          :on-exceed="handleExceed"
          :auto-upload="false"
          :on-success="onSuccess"
          :on-error="onFailed"
      >
        <template #trigger>
          <el-button type="primary">{{$t('common.select_file')}}</el-button>
        </template>
        <el-button style="margin-left: 1em" type="success" @click="submitUpload">
          {{$t('common.upload_to_server')}}
        </el-button>
        <template #tip>
          <div class="el-upload__tip text-red">
            limit 1 file, new file will cover the old file
          </div>
        </template>
      </el-upload>
    </el-col>
  </el-row>

</template>

<style scoped>

</style>