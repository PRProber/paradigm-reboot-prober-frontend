<script setup>
const props = defineProps(['song'])
</script>

<template>
<el-card>
  <template #header>
    <div class="card-header">
      <span>props.song.title</span>
    </div>
  </template>
  <template>
    <el-row>
      <el-col :span="8">
        <el-image style="width: 256px; height: 256px" :src="props.song.cover" :fit="'contain'"/>
      </el-col>
      <el-col :span="16">
        <el-descriptions>
          <el-descriptions-item :label="$t('term.title')">{{ props.song.title }}</el-descriptions-item>
          <el-descriptions-item :label="$t('term.artist')">{{ props.song.artist }}</el-descriptions-item>
          <el-descriptions-item label="BPM">{{ props.song.bpm }}</el-descriptions-item>
          <el-descriptions-item :label="$t('term.illustrator')">{{ props.song.illustrator }}</el-descriptions-item>
          <el-descriptions-item :label="$t('term.version')">{{ props.song.version }}</el-descriptions-item>
          <el-descriptions-item :label="$t('term.album')">{{ props.song.album }}</el-descriptions-item>
          <el-descriptions-item :label="$t('term.genre')">{{ props.song.genre }}</el-descriptions-item>
          <el-descriptions-item :label="$t('term.length')">{{props.song.length}}</el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
  </template>
</el-card>
</template>

<style scoped>

</style>