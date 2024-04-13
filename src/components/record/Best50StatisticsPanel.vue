<script setup>
import { computed } from 'vue'
import { TransitionPresets, useTransition } from "@vueuse/core";

const props = defineProps({
  b50: Number,
  b35: Number,
  b15: Number
})

const b50Value = computed(() => props.b50)
const b35Value = computed(() => props.b35)
const b15Value = computed(() => props.b15)

const b50Trans = useTransition(b50Value, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
})
const b35Trans = useTransition(b35Value, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
})
const b15Trans = useTransition(b15Value, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
})
</script>

<template>
  <el-col :span="4">
    <el-statistic class="statistic-panel" :precision="4" title="Best 50" :value="b50Trans"/>
  </el-col>
  <el-col :span="4">
    <el-statistic class="statistic-panel" :precision="4" title="Best 35 Avg." :value="b35Trans * 50.0 / 35.0"/>
  </el-col>
  <el-col :span="4">
    <el-statistic class="statistic-panel" :precision="4" title="Best 15 Avg." :value="b15Trans * 50.0 / 15.0"/>
  </el-col>
</template>

<style scoped>
</style>