<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import Best50StatisticsPanel from "@/components/record/Best50StatisticsPanel.vue";
import {getB50Trending, getBest50Image, getBestRecords} from "@/utils/api";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/utils/store";
import CommonRecords from "@/components/record/CommonRecords.vue";
import LevelRatingScatterChart from "@/components/chart/LevelRatingScatterChart.vue";
import 'element-plus/theme-chalk/display.css'
import { Download, Refresh } from "@element-plus/icons-vue";
import RatingTrendChart from "@/components/chart/RatingTrendChart.vue";
import { saveAs } from 'file-saver'

const i18n = useI18n()
const userStore = useUserStore()

const records = reactive({
  b35: [],
  b15: []
})

const b50trends = ref([])

const b50Rating = computed(() => {
  return (records.b35.reduce((sum, e) => sum + e.rating, 0) + records.b15.reduce((sum, e) => sum + e.rating, 0)) / 50
})

const b35Rating = computed(() => {
  return (records.b35.reduce((sum, e) => sum + e.rating, 0)) / 35.0
})

const b15Rating = computed(() => {
  return records.b15.reduce((sum, e) => sum + e.rating, 0) / 15.0
})

const refreshRecords = () => {
  getBestRecords(userStore.username).then(response => {
    records.b35 = response.data.records.filter(e => !e.song_level.b15)
    records.b15 = response.data.records.filter(e => e.song_level.b15)
    records.b35.forEach(e => e.rating /= 100)
    records.b15.forEach(e => e.rating /= 100)
    ElMessage({
      'type': 'success',
      'message': i18n.t('message.get_record_success')
    })
  }).catch(error => {
    const details = error.response === undefined ? '' : error.response.data.detail
    ElMessage({
      'type': 'error',
      'message': i18n.t('message.get_record_failed') + details
    })
  })

  getB50Trending(userStore.username).then(response => {
    b50trends.value = response.data
    ElMessage({
      'type': 'success',
      'message': i18n.t('message.get_b50_trending_success')
    })
  }).catch(error => {
    const details = error.response.data === undefined ? '' : error.response.data.detail
    ElMessage({
      'type': 'error',
      'message': i18n.t('message.get_b50_trending_failed') + details
    })
  })
}

userStore.$subscribe((mutation, state) => {
  if (state.logged_in && mutation.type === 'patch object')
    refreshRecords()
  if (!state.logged_in) {
    records.b35.splice(0, records.b35.length)
    records.b15.splice(0, records.b15.length)
  }
})

onMounted(() => {
  refreshRecords()
})

const onDownloadBest50Image = () => {
  getBest50Image(userStore.username).then(response => {
    const blob = new Blob([response.data], { type: 'image/png'})
    saveAs(blob, 'b50.png')
    ElMessage({
      type: 'success',
      message: i18n.t('message.get_b50_img_success')
    })
  }).catch(error => {
    const details = error.response === undefined ? '' : error.response.data.detail
    ElMessage({
      'type': 'error',
      'message': i18n.t('message.get_b50_img_failed') + details
    })
  })
}
</script>

<template>
  <el-scrollbar>
    <el-row justify="end">
      <el-col :span="2">
        <el-button-group>
          <el-tooltip :content="$t('term.export_b50_image')">
            <el-button :icon="Download" @click="onDownloadBest50Image" text/>
          </el-tooltip>
          <el-tooltip :content="$t('common.refresh')">
            <el-button @click="refreshRecords" :icon="Refresh" text/>
          </el-tooltip>
        </el-button-group>
      </el-col>
    </el-row>
    <el-row justify="center" style="margin-top:1em; margin-bottom: 2em;">
      <el-col :span="4" class="hidden-sm-and-down">
        <h4>Overview</h4>
      </el-col>
      <Best50StatisticsPanel
          :b50="b50Rating" :b35="b35Rating" :b15="b15Rating"
      />
    </el-row>
    <el-row justify="center">
      <el-col :span="8" :md="11" :sm="22" :xs="22">
        <el-text>Best 50 Trending</el-text>
        <RatingTrendChart :b50trends="b50trends"/>
      </el-col>
    </el-row>
    <el-row justify="space-evenly" >
      <el-col :span="11" :md="11" :sm="22" :xs="22">
        <el-card>
          <el-text size="large"> {{ $t('term.b35') }} </el-text>
          <el-divider />
          <el-text>{{$t('term.level_rating_distribution')}}</el-text>
          <LevelRatingScatterChart :records="records.b35"/>
          <el-divider />
          <CommonRecords :records="records.b35"/>
        </el-card>
      </el-col>
      <el-col :span="11" class="hidden-sm-and-down">
        <el-card>
          <el-text size="large" type="primary"> {{ $t('term.b15') }} </el-text>
          <el-divider />
          <el-text>{{$t('term.level_rating_distribution')}}</el-text>
          <LevelRatingScatterChart :records="records.b15"/>
          <el-divider />
          <CommonRecords :records="records.b15"/>
        </el-card>
      </el-col>
    </el-row>
    <el-row justify="space-evenly" class="hidden-md-and-up" style="margin-top: 1em">
      <el-col :span="22">
        <el-card>
          <el-text size="large" class="card-title-text" type="primary"> {{ $t('term.b15') }} </el-text>
          <el-divider />
          <el-text>{{$t('term.level_rating_distribution')}}</el-text>
          <LevelRatingScatterChart :records="records.b15"/>
          <el-divider />
          <CommonRecords :records="records.b15"/>
        </el-card>
      </el-col>
    </el-row>
  </el-scrollbar>
</template>
<style scoped>
</style>