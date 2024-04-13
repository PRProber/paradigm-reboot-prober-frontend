<script setup>
import {useStore, useUserStore} from "@/utils/store";
import { Delete } from "@element-plus/icons-vue";
import { postRecord } from "@/utils/api";
import {ElMessage} from "element-plus";
import { useI18n } from "vue-i18n";

const store = useStore()
const userStore = useUserStore()
const i18n = useI18n()

const onClickDelete = (song_level_id) => {
  store.uploadList = store.uploadList.filter(item => item.song_level_id !== song_level_id)
}

const onSubmit = () => {
  const form = []
  store.uploadList.forEach(x => {
    form.push({
      song_level_id: x.song_level_id,
      score: x.score
    })
  })
  postRecord(userStore.username, form).then(() => {
    ElMessage({
      type: "success",
      message: i18n.t('message.post_record_success')
    })
    store.uploadList = store.uploadList.filter(() => false)
  }).catch((error) => {
    ElMessage({
      type: "error",
      message: i18n.t('message.post_record_failed') + error.response.data.detail
    })
  })
}
</script>

<template>
  <el-table :data="store.uploadList" max-height="400" table-layout="auto">
    <el-table-column prop="title" :label="$t('term.title')" min-width="120"/>
    <el-table-column prop="Difficulty" :label="$t('term.difficulty')">
      <template #default="scope">
        <el-text type="primary" v-if="scope.row.difficulty === 'Detected'">
          {{ scope.row.level }}
        </el-text>
        <el-text type="danger" v-if="scope.row.difficulty === 'Invaded'">
          {{ scope.row.level }}
        </el-text>
        <el-text style="color: purple" v-if="scope.row.difficulty === 'Massive'">
          {{ scope.row.level }}
        </el-text>
      </template>
    </el-table-column>
    <el-table-column prop="score" :label="$t('term.score')">
      <template #default="scope">
        <el-input size="small" v-model="store.uploadList[scope.$index].score"/>
      </template>
    </el-table-column>
    <el-table-column>
      <template #default="scope">
        <el-button size="small" :icon="Delete" text @click="onClickDelete(scope.row.song_level_id)"/>
      </template>
    </el-table-column>
  </el-table>
  <el-button type="primary" style="margin-top: 1em" @click="onSubmit">{{ $t('common.submit') }}</el-button>
</template>

<style scoped>

</style>