<script setup>

import { use } from 'echarts/core'
import { ScatterChart } from 'echarts/charts'
import { TooltipComponent, GridComponent, TitleComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide, watch } from "vue";
import { useI18n } from "vue-i18n";

use([GridComponent, TooltipComponent, ScatterChart, CanvasRenderer])

provide(THEME_KEY, 'dark')

const i18n = useI18n()
const props = defineProps({
  records: Array
})

const option = ref({
  backgroundColor: '',
  xAxis: {
    type: 'value',
    name: i18n.t('term.level'),
    minInterval: 0.1,
    min: (value) => { return Math.floor(value.min) },
    max: (value) => { return Math.ceil(value.max) }
  },
  yAxis: {
    type: 'value',
    name: "Rating",
    min: (value) => { return Math.floor(value.min - 10) },
    max: (value) => { return Math.ceil(value.max + 10) }
  },
  tooltip: {
    position: 'top',
        formatter: function (params) {
      return 'Level: ' + params.value[0] + '<br>Rating: ' + params.value[1];
    }
  },
  series: {
      name: 'Record',
      symbolSize: 10,
      data: [],
      type: 'scatter'
  }
})

watch(() => props.records, (newValue, oldValue) => {
  if (props.records !== null) {
    let data = []
    props.records.forEach((value) => {
      data.push([value.song_level.level, value.rating * 50])
    })
    console.log(data)
    option.value.series.data = data
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