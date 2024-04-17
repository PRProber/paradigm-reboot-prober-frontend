<script setup>
import { ref, onMounted, computed } from "vue";
import { ElMessage } from "element-plus";
import { Plus, UploadFilled } from "@element-plus/icons-vue";
import SingleInfo from "@/components/song/SingleInfo.vue";
import { getRecords, getSingleSongInfo } from "@/utils/api";
import QuickPostRecordForm from "@/components/record/QuickUploadRecordForm.vue";
import { useStore, useUserStore } from "@/utils/store";
import { useI18n } from "vue-i18n";
import moment from "moment";

const scopeBoolean = ref(true)
const scopeStr = computed(() => scopeBoolean.value ? 'best' : 'all')
const singleSongInfoDialogVisible = ref(false)
const data = ref(null)
const total = ref(0)
const pageSize = ref(15)
const pageIndex = ref(1)
const sortBy = ref('record_time')
const sortOrder = ref('desc')

const store = useStore()
const userStore = useUserStore()
const i18n = useI18n()

const quickPostRecordDialogVisible = ref(false)
const singleSongInfo = ref(null)
const postRecord = ref({
  title: '',
  difficulty: '',
  level: 0,
  song_level_id: 0
})

const onSortChange = ({prop, order}) => {
  sortBy.value = prop
  if (order === 'descending')
    sortOrder.value = 'desc'
  else if (order === 'ascending')
    sortOrder.value = 'asce'
  else sortOrder.value = null
  refreshData()
}

const refreshData = () => {
  getRecords(userStore.username,
      scopeStr.value,
      pageSize.value,
      pageIndex.value,
      sortBy.value,
      sortOrder.value).then(response => {
    if (data.value === null)
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

onMounted(() => {
  refreshData()
})

const onSingleInfo = songId => {
  singleSongInfoDialogVisible.value = true
  getSingleSongInfo(songId).then((response) => {
    singleSongInfo.value = response.data
  }).catch( error => {
    const details = error.response === undefined ? '' : error.response.data.detail
    ElMessage({
      message: "Failed to get single info. Details: " + details,
      type: "error"
    })
  })
}

const onQuickPostRecord = (title, difficulty, level, song_level_id) => {
  postRecord.value.title = title
  postRecord.value.difficulty = difficulty
  postRecord.value.level = level
  postRecord.value.song_level_id = song_level_id
  quickPostRecordDialogVisible.value = true
}

const onAddToUploadList = (title, difficulty, level, song_level_id) => {
  for (let i = 0; i < store.uploadList.length; i++)
    if (store.uploadList[i].song_level_id === song_level_id) {
      ElMessage({
        'type': 'error',
        'message': i18n.t('message.add_to_upload_list_failed')
      })
      return
    }
  store.uploadList.push({
    title: title,
    difficulty: difficulty,
    level: level,
    song_level_id: song_level_id,
    score: 0,
  })
  ElMessage({
    'type': 'success',
    'message': i18n.t('message.add_to_upload_list_success')
  })
}

const dialogTitle = () => {
  if (singleSongInfo.value != null)
    return singleSongInfo.value.title
  else return null
}
</script>

<template>
  <div style="height: 100%">
    <el-dialog v-model="quickPostRecordDialogVisible" :title="$t('common.upload_record')"
               append-to-body destroy-on-close>
      <QuickPostRecordForm
          :title="postRecord.title"
          :difficulty="postRecord.difficulty"
          :level="postRecord.level"
          :song_level_id="postRecord.song_level_id"
          @post-success="quickPostRecordDialogVisible=false"
          @cancel="quickPostRecordDialogVisible=false"
      />
    </el-dialog>
    <el-dialog v-if="singleSongInfo != null" v-model="singleSongInfoDialogVisible" :title="dialogTitle()" width="800"
               append-to-body>
      <SingleInfo :song="singleSongInfo"></SingleInfo>
    </el-dialog>
    <el-row justify="center" style="height: 100%">
      <el-table
          :data="data"
          table-layout="auto"
          :fit="true"
          height="100%"
          @sort-change="onSortChange"
          style="width: 100%"
      >
        <el-table-column prop="no" label="#" width="80">
          <template #default="scope">
            {{ scope.$index + (pageIndex - 1) * pageSize + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="title" :label="$t('term.title')" width="300" sortable="costum">
          <template #default="scope">
            <el-link @click="onSingleInfo(scope.row.song_level.song_id)">{{ scope.row.song_level.title }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
            prop="b15"
            column-key="b15"
            :label="$t('term.b35orb15')"
        >
          <!--        后面有需求再加-->
          <!--        :filters="[-->
          <!--              { text: $t('term.b15'), value: true },-->
          <!--              { text: $t('term.b35'), value: false }-->
          <!--            ]"-->
          <!--        :filtered-value="filters.b15"-->
          <!--        :filter-method="filterHandler"-->
          <template #default="scope">
            <el-tag v-if="scope.row.b15" round type="primary" size="large">{{ $t('term.b15') }}</el-tag>
            <el-tag v-else round type="info" size="large">{{ $t('term.b35') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="difficulty"
            :label="$t('term.difficulty')">
          <!--    后面有需求再加                   -->
          <!--        :filters="[-->
          <!--              { text: 'Detected', value: 'Detected' },-->
          <!--              { text: 'Invaded', value: 'Invaded' },-->
          <!--              { text: 'Massive', value: 'Massive' }-->
          <!--          ]"-->
          <!--        :filter-method="filterHandler"-->
          <template #default="scope">
            <el-tag v-if="scope.row.song_level.difficulty_id === 1" round effect="dark" type="primary" size="large">
              Detected
            </el-tag>
            <el-tag v-if="scope.row.song_level.difficulty_id === 2" round effect="dark" type="danger" size="large">
              Invaded
            </el-tag>
            <el-tag v-if="scope.row.song_level.difficulty_id === 3" round effect="dark" color="purple" type="info" size="large">
              Massive
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="level" :label="$t('term.level')" sortable="costum">
          <template #default="scope">{{ scope.row.song_level.level }}</template>
        </el-table-column>
        <el-table-column prop="score" :label="$t('term.score')" sortable="costum">
          <template #default="scope">{{ scope.row.score }}</template>
        </el-table-column>
        <el-table-column prop="rating" label="Rating" sortable="costum">
          <template #default="scope">{{ (scope.row.rating / 100).toFixed(2) }}</template>
        </el-table-column>
        <el-table-column prop="record_time" :label="$t('term.record_time')" sortable="costum">
          <template #default="scope">{{ moment(scope.row.record_time).format('YY/MM/DD hh:mm A') }}</template>
        </el-table-column>
        <el-table-column align="right" :width="40">
          <template #header>
            <el-switch
                v-model="scopeBoolean"
                :active-text="$t('term.best_only')"
                @change="refreshData"
            />
          </template>
          <template #default="scope">
            <el-space>
              <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="$t('message.add_to_upload_list')"
                  placement="top"
              >
                <el-button
                    :icon="Plus"
                    text
                    @click="onAddToUploadList(scope.row.song_level.title,
                    scope.row.song_level.difficulty, scope.row.song_level.level, scope.row.song_level.song_level_id)"
                />
              </el-tooltip>
              <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="$t('message.quick_upload')"
                  placement="top"
              >
                <el-button
                    :icon="UploadFilled"
                    text
                    @click="onQuickPostRecord(scope.row.song_level.title,
                scope.row.song_level.difficulty, scope.row.song_level.level, scope.row.song_level.song_level_id)"
                />
              </el-tooltip>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row justify="center">
      <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          @currentChange="refreshData()"
          v-model:current-page="pageIndex"
      />
    </el-row>
  </div>


</template>

<style scoped>

</style>