<script setup>
import { ref } from 'vue';
import UploadList from "@/components/record/UploadList.vue";
import PaginationRecords from "@/components/record/PaginationRecords.vue";
import {Refresh, ShoppingCart} from "@element-plus/icons-vue";

const paginationRecords = ref(null)
const scope = ref('best')
</script>

<template>
  <div style="height: 100%">
    <el-row justify="end">
      <el-col :span="2">
        <el-popover
            placement="bottom"
            :title="$t('term.upload_list')"
            :width="550"
            trigger="hover"
        >
          <template #reference>
            <el-button :icon="ShoppingCart" text/>
          </template>
          <UploadList/>
        </el-popover>
        <el-tooltip :content="$t('common.refresh')">
          <el-button @click="" :icon="Refresh" text/>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row justify="center" style="height: 90%; margin-top: 1em">
      <el-col :span="22" style="height: 100%">
        <PaginationRecords :scope="scope"/>
      </el-col>
    </el-row>
  </div>
  <el-row>
  </el-row>
</template>

<style scoped>

</style>
