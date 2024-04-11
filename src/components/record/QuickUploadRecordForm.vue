<script setup>
import { ref, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import { postRecord } from "@/utils/api";
import { useUserStore } from "@/utils/store";
import { useI18n } from "vue-i18n";

const userStore = useUserStore()
const i18n = useI18n()

const emit = defineEmits(['post-success', 'cancel'])
const props = defineProps(['title', 'difficulty', 'level', 'song_level_id'])
const form = reactive({
  username: '',
  song_level_id: 0,
  score: 0,
  replace: false,
})

const rules = reactive({
  score: [
    { required: true, trigger: 'blur', message: i18n.t('message.required') },
    { type: 'number', trigger: 'blur', message: i18n.t('message.score_out_of_range') },
    { min: 0, max: 1010000, trigger: 'blur', message: i18n.t('message.score_out_of_range') }
  ]
})

onMounted(() => {
  form.username = userStore.username
  form.song_level_id = props.song_level_id
  form.score = 0
})

const onSubmit = () => {
  // TODO: API 更新之后把 form 换成 [form]
  postRecord(form).then((response) => {
    ElMessage({
      type: "success",
      message: i18n.t('message.post_record_success')
    })
    emit('post-success', response.data)
  }).catch((error) => {
    ElMessage({
      type: "error",
      message: i18n.t('message.post_record_failed') + error.response.data.detail
    })
  })
}
</script>

<template>
  <el-form :model="form" label-width="auto" :rules="rules">
    <el-form-item :label="$t('term.title')">
      {{ props.title }}
    </el-form-item>
    <el-form-item :label="$t('term.level')">
      <el-text type="primary" v-if="props.difficulty === 'Detected'">
        {{ props.difficulty + ' ' + props.level }}
      </el-text>
      <el-text type="danger" v-if="props.difficulty === 'Invaded'">
        {{ props.difficulty + ' ' + props.level }}
      </el-text>
      <el-text style="color: purple" v-if="props.difficulty === 'Massive'">
        {{ props.difficulty + ' ' + props.level }}
      </el-text>
    </el-form-item>
    <el-form-item :label="$t('term.score')" required>
      <el-input v-model.number="form.score"/>
    </el-form-item>
    <el-form-item :label="$t('term.replace')">
      <el-radio-group v-model="form.replace">
        <el-radio :value="true">{{ $t("common.yes") }}</el-radio>
        <el-radio :value="false">{{ $t("common.no") }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item style="text-align: right;">
      <el-button type="primary" @click="onSubmit">{{ $t('common.submit') }}</el-button>
      <el-button @click="$emit('cancel')">{{ $t('common.cancel') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>