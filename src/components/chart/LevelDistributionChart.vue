<script setup>
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { TooltipComponent, GridComponent, TitleComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide, watch } from "vue";
import { useI18n } from "vue-i18n";

provide(THEME_KEY, 'dark')

const i18n = useI18n()

use([TooltipComponent, GridComponent, BarChart, CanvasRenderer, TitleComponent])
const props = defineProps({
  records: Array
})

watch(() => props.records, (newValue, oldValue) => {
  if (newValue !== null) {
    const map = new Map()
    const levelList = [], countList = []
    newValue.forEach((value) => {
      if (map.has(value.song_level.level))
        map.set(value.song_level.level, map.get(value.song_level.level) + 1)
      else map.set(value.song_level.level, 1)
    })
    for (let key of map.keys())
      levelList.push(key)
    levelList.sort()
    levelList.forEach((value) => countList.push(map.get(value)))
    option.value.xAxis[0].data = levelList
    option.value.series[0].data = countList
  }
})

const option = ref({
  backgroundColor: '',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      label: i18n.t('term.level'),
      type: 'category',
      data: [],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: {
    type: 'value',
    minInterval: 1
  },
  series: [
    {
      name: 'Count',
      type: 'bar',
      barWidth: '60%',
      data: [],
    }
  ]
})
</script>

<template>
  <v-chart :autoresize="true" :option="option" class="chart"/>
</template>

<style scoped>
.chart {
  height: 200px;
}
</style>