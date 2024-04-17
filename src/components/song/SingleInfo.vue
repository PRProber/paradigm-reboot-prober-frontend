<script setup>
const props = defineProps(['song'])
const cover_src_root = 'https://api.prp.icel.site/api/v1/cover/'

const cover_src = () => {
  if (props.song != null)
    return cover_src_root + props.song.cover
  else return null
}
</script>

<template>
  <el-row :gutter="40">
    <el-col :span="8">
      <el-image style="width: 256px; height: 256px" :src="cover_src()" :fit="'contain'"/>
    </el-col>
    <el-col :span="16">
      <el-descriptions :column="2">
        <el-descriptions-item :label="$t('term.title')" label-class-name="bold-label">
          {{ props.song.title }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('term.artist')" label-class-name="bold-label">
          {{ props.song.artist }}
        </el-descriptions-item>
        <el-descriptions-item label="BPM" label-class-name="bold-label">
          {{ props.song.bpm }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('term.illustrator')" label-class-name="bold-label">
          {{ props.song.illustrator }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('term.version')" label-class-name="bold-label">
          {{ props.song.version }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('term.album')" label-class-name="bold-label">
          {{ props.song.album }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('term.genre')" label-class-name="bold-label">
          {{ props.song.genre }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('term.length')" label-class-name="bold-label">
          {{ props.song.length }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="1">
        <el-descriptions-item :label="$t('term.difficulty')" label-class-name="bold-label">
          <el-space wrap>
            <el-tag type="primary">{{ 'Detected ' + props.song.song_levels[0].level }}</el-tag>
            <el-tag type="danger">{{'Invaded ' + props.song.song_levels[1].level }}</el-tag>
            <el-tag color="purple" type="info">{{ 'Massive ' + props.song.song_levels[2].level }}</el-tag>
          </el-space>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('term.level_design')" label-class-name="bold-label">
          <el-space wrap>
            <el-tag type="primary">{{ props.song.song_levels[0].level_design }}</el-tag>
            <el-tag type="danger">{{ props.song.song_levels[1].level_design }}</el-tag>
            <el-tag color="purple" type="info">{{ props.song.song_levels[2].level_design }}</el-tag>
          </el-space>
        </el-descriptions-item>
      </el-descriptions>
    </el-col>
  </el-row>
</template>

<style scoped>
:deep(.bold-label) {
  font-weight: bold;
}
</style>