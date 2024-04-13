<script setup>
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import SingleInfo from "@/components/song/SingleInfo.vue";
import { getSingleSongInfo } from "@/utils/api";
import QuickPostRecordForm from "@/components/record/QuickUploadRecordForm.vue";
import { useStore } from "@/utils/store";
import {useI18n} from "vue-i18n";

const props = defineProps(['records'])
const singleSongInfoDialogVisible = ref(false)

const store = useStore()
const i18n = useI18n()

const quickPostRecordDialogVisible = ref(false)
const singleSongInfo = ref(null)
const postRecordTitle = ref('')
const postRecordDiff = ref('')
const postRecordLevel = ref(0)
const postRecordLevelId = ref(0)

const filterHandler = (value, row, column) => {
  return row[column['property']] === value
}

const onSingleInfo = songId => {
  singleSongInfoDialogVisible.value = true
  getSingleSongInfo(songId).then((response) => {
    singleSongInfo.value = response.data
  }).catch( error => {
    ElMessage({
      message: "Failed to get single info. Details: " + error.toString(),
      type: "error"
    })
  })
}

const onQuickPostRecord = (title, difficulty, level, song_level_id) => {
  postRecordTitle.value = title
  postRecordDiff.value = difficulty
  postRecordLevel.value = level
  postRecordLevelId.value = song_level_id
  quickPostRecordDialogVisible.value = true
}

const dialogTitle = () => {
  if (singleSongInfo.value != null)
    return singleSongInfo.value.title
  else return null
}

const tableData = computed(() => {
  if (props.records === undefined)
    return null
  else return props.records
})
</script>

<template>
  <el-dialog v-model="quickPostRecordDialogVisible" :title="$t('common.upload_record')"
             append-to-body destroy-on-close>
    <QuickPostRecordForm
        :title="postRecordTitle"
        :difficulty="postRecordDiff"
        :level="postRecordLevel"
        :song_level_id="postRecordLevelId"
        @post-success="quickPostRecordDialogVisible=false"
        @cancel="quickPostRecordDialogVisible=false"
    />
  </el-dialog>
  <el-dialog v-if="singleSongInfo != null" v-model="singleSongInfoDialogVisible" :title="dialogTitle()" width="800"
             append-to-body>
    <SingleInfo :song="singleSongInfo"></SingleInfo>
  </el-dialog>

  <el-table
      :data="tableData"
      table-layout="auto"
      :fit="true"
      height="100%"
      style="width: 100%"
  >
    <el-table-column prop="no" label="#">
      <template #default="scope">
        {{ scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column prop="title" :label="$t('term.title')" sortable>
      <template #default="scope">
        <el-link @click="onSingleInfo(scope.row.song_level.song_id)">{{ scope.row.song_level.title }}</el-link>
      </template>
    </el-table-column>
    <el-table-column
        prop="difficulty"
        :label="$t('term.difficulty')"
        :filters="[
              { text: 'Detected', value: 'Detected' },
              { text: 'Invaded', value: 'Invaded' },
              { text: 'Massive', value: 'Massive' }
          ]"
        :filter-method="filterHandler"
    >
      <template #default="scope">
        <el-tag v-if="scope.row.song_level.difficulty_id === 1" round effect="dark" type="primary">
          {{ 'Detected ' + scope.row.song_level.level }}
        </el-tag>
        <el-tag v-if="scope.row.song_level.difficulty_id === 2" round effect="dark" type="danger">
          {{ 'Invaded ' + scope.row.song_level.level }}
        </el-tag>
        <el-tag v-if="scope.row.song_level.difficulty_id === 3" round effect="dark" color="purple" type="info">
          {{ 'Massive ' + scope.row.song_level.level }}
        </el-tag>
      </template>
    </el-table-column>
<!--    <el-table-column prop="fitting_level" :label="$t('term.fitting_level')" sortable>-->
<!--      <template #default="scope">{{ scope.row.song_level.fitting_level }}</template>-->
<!--    </el-table-column>-->
    <el-table-column prop="score" :label="$t('term.score')" sortable>
      <template #default="scope">
        {{ scope.row.score }}
      </template>
    </el-table-column>
    <el-table-column prop="rating" label="Rt." sortable>
      <template #default="scope">
        {{ (scope.row.rating * 50).toFixed(2) }}
      </template>
    </el-table-column>
    <el-table-column align="right" :width="40">
      <template #default="scope">
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
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>