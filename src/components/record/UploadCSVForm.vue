<script setup>
import { uploadCsvUrl } from "@/utils/api";
import { genFileId } from 'element-plus'

const upload = ref(null)
const handleExceed = (files) => {
  upload.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  upload.value.handleStart(file)
}


</script>

<template>
  <el-text>{{$t("message.upload_csv_info")}}</el-text>
  <el-upload
      ref="upload"
      class="upload-demo"
      :action="uploadCsvUrl"
      :limit="1"
      :on-exceed="handleExceed"
      :auto-upload="false"
  >
    <template #trigger>
      <el-button type="primary">select file</el-button>
    </template>
    <el-button class="ml-3" type="success" @click="submitUpload">
      upload to server
    </el-button>
    <template #tip>
      <div class="el-upload__tip text-red">
        limit 1 file, new file will cover the old file
      </div>
    </template>
  </el-upload>
</template>

<style scoped>

</style>