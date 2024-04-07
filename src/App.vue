<script setup>
import {DataAnalysis, InfoFilled, Medal, Memo, User} from "@element-plus/icons-vue";
import {useUserStore} from "@/utils/store";

const userStore = useUserStore()
</script>

<template>
  <div id="app">
    <el-container style="height: 100%">
      <el-header>
        <el-menu mode="horizontal" :ellipsis="false">
          <el-space>
            <h3>Paradigm: Reboot</h3>
            <h3 style="color: dodgerblue"> Prober</h3>
          </el-space>
          <div class="flex-grow" />
          <div style="margin-top: auto; margin-bottom: auto">
            <el-text v-if="userStore.logged_in">
              {{ $t('message.welcome', { username: userStore.username }) }}
            </el-text>
            <el-button v-if="userStore.logged_in === true" text>
              {{ $t('auth.logout') }}
            </el-button>
            <el-button v-if="userStore.logged_in === false" text>
              {{ $t('auth.login') }}
            </el-button>
            <el-button v-if="userStore.logged_in === false" text>
              {{ $t('auth.register') }}
            </el-button>
          </div>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <el-menu mode="vertical" :router="true">
            <el-menu-item index="0" route="/best50">
              <el-icon><DataAnalysis /></el-icon>
              <template #title>{{ $t('term.b50') }}</template>
            </el-menu-item>
            <el-menu-item index="1" route="/best">
              <el-icon><Medal /></el-icon>
              <template #title>{{ $t('term.best_records') }} </template>
            </el-menu-item>
            <el-menu-item index="2" route="/songs">
              <el-icon><InfoFilled /></el-icon>
              <template #title>{{ $t('term.song_levels') }}</template>
            </el-menu-item>
            <el-menu-item index="3" route="/records">
              <el-icon><Memo /></el-icon>
              <template #title>{{ $t('term.records') }}</template>
            </el-menu-item>
            <el-menu-item index="4" route="profile">
              <el-icon><User /></el-icon>
              <template #title>{{ $t('auth.account') }}</template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>