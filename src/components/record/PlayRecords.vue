<script setup>
import { ref } from 'vue';
import UploadList from "@/components/record/UploadList.vue";
import PaginationRecords from "@/components/record/PaginationRecords.vue";
import {Download, Refresh, ShoppingCart, Upload} from "@element-plus/icons-vue";
import UploadCSVForm from "@/components/record/UploadCSVForm.vue";
import {useUserStore} from "@/utils/store";
import {getCsv, getRecords} from "@/utils/api";
import { useI18n } from "vue-i18n";
import {ElMessage} from "element-plus";

const paginationRecords = ref(null)
const userStore = useUserStore()
const i18n = useI18n()

const total = ref(0)
const data = ref(null)

const scopeRef = ref('')
const pageSizeRef = ref(0)
const pageIndexRef = ref(0)
const sortByRef = ref('record_time')
const sortOrderRef = ref('desc')

const uploadCsvDialogVisible = ref(false)

const onExportCsv = () => {
  getCsv(userStore.username).then((response) => {
    const blob = new Blob([response.data], { type: 'text/csv'})
    saveAs(blob, 'records.csv')
    ElMessage({
      type: 'success',
      message: i18n.t('message.get_csv_success')
    })
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: i18n.t('message.get_csv_failed')
    })
  })
}

const onUpdateQueryParam = (scope, pageSize, pageIndex, sortBy, sortOrder) => {
  scopeRef.value = scope
  pageSizeRef.value = pageSize
  pageIndexRef.value = pageIndex
  sortByRef.value = sortBy
  sortOrderRef.value = sortOrder

  getRecordData(false)
}

const getRecordData = (isRefresh = false) => {
  getRecords(userStore.username,
      scopeRef.value,
      pageSizeRef.value,
      pageIndexRef.value,
      sortByRef.value,
      sortOrderRef.value).then(response => {
    if (data.value === null || isRefresh)
      ElMessage({
        'type': 'success',
        'message': i18n.t("message.get_record_success")
      })
    data.value = response.data.records
    total.value = response.data.total
  }).catch( () => {
    ElMessage({
      message: i18n.t('message.get_record_failed'),
      type: "error"
    })
  })
}
</script>

<template>
  <div style="height: 100%">
    <el-dialog v-model="uploadCsvDialogVisible" :title="$t('term.upload_csv')" append-to-body destroy-on-close>
      <UploadCSVForm/>
    </el-dialog>
    <el-row justify="end">
      <el-col :span="4">
        <el-button-group>
          <el-tooltip :content="$t('term.export_csv')">
            <el-button :icon="Download" @click="onExportCsv" text/>
          </el-tooltip>
          <el-tooltip :content="$t('term.upload_csv')">
            <el-button @click='uploadCsvDialogVisible=true' :icon="Upload" text></el-button>
          </el-tooltip>
          <el-popover
              placement="bottom"
              :title="$t('term.upload_list')"
              :width="550"
              trigger="hover"
          >
            <template #reference>
              <el-button :icon="ShoppingCart" text/>
            </template>
            <UploadList/>
          </el-popover>
          <el-tooltip :content="$t('common.refresh')">
            <el-button @click="getRecordData(true)" :icon="Refresh" text/>
          </el-tooltip>
        </el-button-group>
      </el-col>
    </el-row>
    <el-row justify="center" style="height: 90%; margin-top: 1em">
      <el-col :span="22" style="height: 100%">
        <PaginationRecords :data="data" :total="total" @updateParam="onUpdateQueryParam"/>
      </el-col>
    </el-row>
  </div>
  <el-row>
  </el-row>
</template>

<style scoped>

</style>
