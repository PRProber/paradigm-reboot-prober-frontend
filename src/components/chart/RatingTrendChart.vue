<script setup>
import {provide, ref, watch} from 'vue'
import VChart, { THEME_KEY } from "vue-echarts";
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([GridComponent, LineChart, CanvasRenderer])
const props = defineProps({
  b50trends: Array
})

provide(THEME_KEY, 'dark')

const option = ref({
  backgroundColor: '',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    name: "Time",
    type: 'time',
    min: (value) => { return value.min },
    max: (value) => { return value.max }
  },
  yAxis: {
    name: "Rating",
    type: 'value',
    min: (value) => { return Math.floor(value.min - 10) },
    max: (value) => { return Math.ceil(value.max + 10) }
  },
  series: {
      data: [],
      type: 'line',
      smooth: true
  }
})

watch(() => props.b50trends, () => {
  if (props.b50trends !== null) {
    const data = []
    props.b50trends.forEach((value) => {
      data.push([value.record_time, value.b50rating])
    })
    option.value.series.data = data
  }
  else {
    option.value.series.data = []
  }
})
</script>

<template>
  <v-chart :autoresize="true" :option="option" class="chart"/>
</template>

<style scoped>
.chart {
  height: 300px;
}
</style>