import { createApp } from 'vue'
import { createPinia } from "pinia";
import { createRouter, createWebHashHistory } from "vue-router";
import { createI18n } from "vue-i18n";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import SongLevels from "@/components/song/SongLevels.vue";
import Best50Records from "@/components/record/Best50Records.vue";
import PlayRecords from "@/components/record/PlayRecords.vue";
import UserProfile from "@/components/user/UserProfile.vue";
import messages from "@/utils/message";
import BestPlayRecords from "@/components/record/BestPlayRecords.vue";

import "element-plus/theme-chalk/el-message-box.css"
import "element-plus/theme-chalk/el-message.css"

const app= createApp(App)
const pinia = createPinia()

const routes = [
    {
        path: '/best50',
        component: Best50Records
    },
    {
        path: '/records',
        component: PlayRecords
    },
    {
        path: '/best',
        component: BestPlayRecords
    },
    {
        path: '/songs',
        component: SongLevels
    },
    {
        path: '/profile',
        component: UserProfile
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

const i18n = createI18n({
    locale: 'zh_cn',
    fallbackLocale: 'en',
    legacy: false,
    messages
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')
