<script setup>
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import {More, Refresh, UploadFilled, Plus, ShoppingCart} from "@element-plus/icons-vue";
import SingleInfo from "@/components/song/SingleInfo.vue";
import { getSingleSongInfo } from "@/utils/api";
import QuickPostRecordForm from "@/components/record/QuickUploadRecordForm.vue";
import { useStore } from "@/utils/store";
import {useI18n} from "vue-i18n";
import UploadListPreview from "@/components/record/UploadList.vue";

defineEmits(['refreshLevels'])
const props = defineProps(['levels'])
const singleSongInfoDialogVisible = ref(false)
const search = ref('')

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

const filterTableData = computed(() => {
  if (props.levels != null)
    return props.levels.filter(
        (data) =>
            !search.value ||
            data.title.toLowerCase().includes(search.value.toLowerCase())
    )
  else return null
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
      :data="filterTableData"
      table-layout="auto"
      :fit="true"
      height="100%"
      style="width: 100%"
  >
    <template #empty>

    </template>
    <el-table-column fixed prop="song_level_id" :label="$t('term.song_level_id')" width="100" sortable>
      <template #default="scope"> {{ scope.row.song_level_id }} </template>
    </el-table-column>
    <el-table-column fixed prop="title" :label="$t('term.title')" sortable>
      <template #default="scope">
        <el-link @click="onSingleInfo(scope.row.song_id)">{{ scope.row.title }}</el-link>
      </template>
    </el-table-column>
    <el-table-column prop="version" :label="$t('term.version')" sortable>
      <template #default="scope">
        {{ scope.row.version }}
      </template>
    </el-table-column>
    <el-table-column
        prop="b15"
        :label="$t('term.b35orb15')"
        :filters="[
            { text: $t('term.b15'), value: true },
            { text: $t('term.b35'), value: false }
          ]"
        :filter-method="filterHandler"
    >
      <template #default="scope">
        <el-tag v-if="scope.row.b15" round type="primary" size="large">{{ $t('term.b15') }}</el-tag>
        <el-tag v-else round type="info" size="large">{{ $t('term.b35') }}</el-tag>
      </template>
    </el-table-column>
    <!-- 暂时先不用这个，考虑后续需求再加 -->
<!--    <el-table-column-->
<!--      prop="album"-->
<!--      :label="$t('term.album')"-->
<!--      sortable-->
<!--    >-->
<!--      <template #default="scope">-->
<!--        {{ scope.row.album }}-->
<!--      </template>-->
<!--    </el-table-column>-->
    <el-table-column fixed
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
        <el-tag v-if="scope.row.difficulty_id === 1" round effect="dark" type="primary" size="large">
          Detected
        </el-tag>
        <el-tag v-if="scope.row.difficulty_id === 2" round effect="dark" type="danger" size="large">
          Invaded
        </el-tag>
        <el-tag v-if="scope.row.difficulty_id === 3" round effect="dark" color="purple" type="info" size="large">
          Massive
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="level" :label="$t('term.level')" sortable>
      <template #default="scope">{{ scope.row.level }}</template>
    </el-table-column>
    <el-table-column prop="fitting_level" :label="$t('term.fitting_level')" sortable>
      <template #default="scope">{{ scope.row.fitting_level }}</template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" :placeholder="$t('message.search')"/>
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
                @click="onAddToUploadList(scope.row.title, scope.row.difficulty, scope.row.level, scope.row.song_level_id)"
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
                @click="onQuickPostRecord(scope.row.title, scope.row.difficulty, scope.row.level, scope.row.song_level_id)"
            />
          </el-tooltip>
          <el-tooltip
              class="box-item"
              effect="dark"
              :content="$t('message.song_detail')"
              placement="top"
          >
            <el-button text :icon="More" @click="onSingleInfo(scope.row.song_id)"/>
          </el-tooltip>
        </el-space>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>