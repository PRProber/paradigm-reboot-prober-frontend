<script setup>
import { onMounted } from "vue";
import { ElMessage } from "element-plus";

import { useStore } from "@/utils/store";
import { getAllSongLevels } from "@/utils/api"
import CommonLevels from "@/components/song/CommonLevels.vue";

const store = useStore()

const refreshLevelInfo = () => {
  getAllSongLevels().then(response => {
    store.levels = response.data
    ElMessage({
      message: "Successfully get level information",
      type: "success"
    })
  }).catch( error => {
    ElMessage({
      message: "Failed to get level information. Details" + error.toString(),
      type: "error"
    })
  })
}

onMounted(() => {
  if (store.levels == null)
    refreshLevelInfo()
})
</script>

<template>
  <CommonLevels :levels="store.levels" @refreshLevels="refreshLevelInfo"/>
</template>

<style scoped>

</style>