<script setup>
import { ref, onMounted } from "vue";
import { DataAnalysis, Memo, PieChart, User, SwitchButton, InfoFilled } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";


import { useRouter } from 'vue-router'
import { useUserStore, useStore } from "@/utils/store";
import LoginForm from "@/components/user/LoginForm.vue";
import RegisterForm from "@/components/user/RegisterForm.vue";
import { getAllSongLevels, getMyInfo} from "@/utils/api";
import { ElMessage } from "element-plus";
import UserProfile from "@/components/user/UserProfile.vue";

const userStore = useUserStore()
const router = useRouter()
const store = useStore()
const i18n = useI18n()

onMounted(() => {
  getMyInfo().then(response => {
    userStore.profile = response.data
    userStore.username = response.data.username
    userStore.logged_in = true
    userStore.is_admin = response.data.is_admin
    ElMessage({
      "type": "success",
      "message": i18n.t('message.login_success')
    })
    ElMessage({
      "type": "success",
      "message": i18n.t('message.get_my_info_success')
    })
    router.push('/best50')
  }).catch(() => {
    if (userStore.logged_in) {
      ElMessage({
        "type": "warning",
        "message": i18n.t("message.token_expired")
      })
      userStore.$reset()
    }
  })
  getAllSongLevels().then(response => {
    store.levels = response.data
    ElMessage({
      message: i18n.t('message.get_levels_success'),
      type: "success"
    })
  }).catch( () => {
    ElMessage({
      message: i18n.t('message.get_levels_failed'),
      type: "error"
    })
  })
})

const loginDialogVisible = ref(false)
const registerDialogVisible = ref(false)
const profileDialogVisible = ref(false)
const isCollapse = ref(true)

const onClickLogoutBtn = () => {
  userStore.$reset()
}

const onClickLoginBtn = () => {
  loginDialogVisible.value = true
}

const onRegisterSuccess = () => {
  registerDialogVisible.value = false
  loginDialogVisible.value = true
}

const onClickProfileBtn = () => {
  profileDialogVisible.value = true
}

const onLoginSuccess = () => {
  loginDialogVisible.value = false
  getMyInfo().then(response => {
    userStore.profile = response.data
    userStore.username = response.data.username
    userStore.logged_in = true
    userStore.is_admin = response.data.is_admin
    ElMessage({
      "type": "success",
      "message": i18n.t('message.get_my_info_success')
    })
  })
}

const onClickRegisterBtn = () => {
  registerDialogVisible.value = true
}

</script>

<template>
  <div id="app">
    <el-container style="height: 91vh">
      <el-dialog v-model="registerDialogVisible" :title="$t('auth.register')" destroy-on-close append-to-body>
        <RegisterForm @register-success="onRegisterSuccess"/>
      </el-dialog>
      <el-dialog v-model="loginDialogVisible" :title="$t('auth.login')" destroy-on-close append-to-body>
        <LoginForm @login-success="onLoginSuccess"/>
      </el-dialog>
      <el-dialog v-model="profileDialogVisible" :title="$t('auth.account')" destroy-on-close append-to-body>
        <UserProfile @cancel="profileDialogVisible=false"/>
      </el-dialog>

      <el-header>
        <el-menu mode="horizontal" :ellipsis="false">
          <el-space>
            <h3>Paradigm</h3>
            <h3 style="color: dodgerblue">Prober</h3>
          </el-space>
          <div class="flex-grow" />
          <div style="margin-top: auto; margin-bottom: auto">
            <el-text v-if="userStore.logged_in">
              {{ $t('message.welcome', { username: userStore.username }) }}
            </el-text>
            <el-tooltip :content="$t('auth.profile')">
              <el-button v-if="userStore.logged_in" :icon="User" text @click="onClickProfileBtn"/>
            </el-tooltip>
            <el-tooltip :content="$t('auth.logout')">
              <el-button v-if="userStore.logged_in" :icon="SwitchButton" text @click="onClickLogoutBtn"/>
            </el-tooltip>
            <el-button v-if="!userStore.logged_in" text @click="onClickLoginBtn">
              {{ $t('auth.login') }}
            </el-button>
            <el-button v-if="!userStore.logged_in" text @click="onClickRegisterBtn">
              {{ $t('auth.register') }}
            </el-button>
          </div>
        </el-menu>
      </el-header>
      <el-container style="height: 100%">
        <el-aside width="auto" style="height: 100%">
          <el-menu mode="vertical" :router="true" style="height: 100%" :collapse="isCollapse">
            <el-menu-item index="0" route="/best50">
              <el-icon><DataAnalysis /></el-icon>
              <template #title>{{ $t('term.b50') }}</template>
            </el-menu-item>
            <el-menu-item index="1" route="/songs">
              <el-icon><PieChart /></el-icon>
              <template #title>{{ $t('term.song_levels') }}</template>
            </el-menu-item>
            <el-menu-item index="2" route="/records">
              <el-icon><Memo /></el-icon>
              <template #title>{{ $t('term.records') }}</template>
            </el-menu-item>
            <el-menu-item index="3" route="/">
              <el-icon><InfoFilled /></el-icon>
              <template #title>{{ $t('common.about') }}</template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="height: 100%">
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