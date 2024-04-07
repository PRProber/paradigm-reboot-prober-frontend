<script setup>
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import {More, Refresh} from "@element-plus/icons-vue";
import SingleInfo from "@/components/song/SingleInfo.vue";
import { getSingleSongInfo } from "@/utils/api";

const emit = defineEmits(['refreshLevels'])
const props = defineProps(['levels'])
const singleSongInfoDialogVisible = ref(false)
const search = ref('')

const singleSongInfo = ref(null)

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
  <el-dialog v-if="singleSongInfo != null" v-model="singleSongInfoDialogVisible" :title="dialogTitle()" width="800">
      <SingleInfo :song="singleSongInfo"></SingleInfo>
  </el-dialog>
  <el-row>
    <el-col>
      <el-auto-resizer>
        <!--TODO: 替换成虚拟化表格-->
        <el-table
            :data="filterTableData"
            table-layout="auto"
            style="width: 100%"
            max-height="700"
        >
          <el-table-column fixed prop="title" :label="$t('term.title')" sortable min-width="120">
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
              <el-input v-model="search" :placeholder="$t('message.search')">
                <template #prepend>
                  <el-button :icon="Refresh" circle @click="$emit('refreshLevels')"></el-button>
                </template>
              </el-input>
            </template>
            <template #default="scope">
              <el-icon @click="onSingleInfo(scope.row.song_id)"><More /></el-icon>
            </template>
          </el-table-column>
        </el-table>
      </el-auto-resizer>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>