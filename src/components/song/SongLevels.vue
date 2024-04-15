<script setup>
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
import { onBeforeUnmount } from "vue";

import { useStore } from "@/utils/store";
import { getAllSongLevels } from "@/utils/api"
import CommonLevels from "@/components/song/CommonLevels.vue";
import { Download, Refresh, ShoppingCart} from "@element-plus/icons-vue";
import UploadListPreview from "@/components/record/UploadList.vue";

const store = useStore()
const i18n = useI18n()

const refreshLevelInfo = () => {
  getAllSongLevels().then(response => {
    store.levels = response.data
    ElMessage({
      message: i18n.t('message.get_levels_success'),
      type: "success"
    })
  }).catch( () => {
    ElMessage({
      message: i18n.t('message.get_levels_failed'),
      type: "error"
    })
  })
}

onBeforeUnmount(() => {

})
</script>

<template>
  <div style="height: 100%">
    <el-row justify="end">
      <el-col :span="2">
        <el-popover
            placement="bottom"
            :title="$t('term.upload_list')"
            :width="550"
            trigger="hover"
        >
          <template #reference>
            <el-button :icon="ShoppingCart" text/>
          </template>
          <UploadListPreview/>
        </el-popover>
        <el-tooltip :content="$t('common.refresh')">
          <el-button @click="refreshLevelInfo" :icon="Refresh" text/>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row justify="center" style="height: 90%; margin-top: 1em">
      <el-col :span="22" style="height: 100%">
        <CommonLevels :levels="store.levels" @refreshLevels="refreshLevelInfo"/>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>