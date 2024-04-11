<script setup>
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";

import { useStore } from "@/utils/store";
import { getAllSongLevels } from "@/utils/api"
import CommonLevels from "@/components/song/CommonLevels.vue";

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
</script>

<template>
  <div style="height: 100%">
    <CommonLevels :levels="store.levels" @refreshLevels="refreshLevelInfo"/>
  </div>
</template>

<style scoped>

</style>