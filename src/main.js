import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from "vue-router";
import { createI18n } from "vue-i18n";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import SongLevels from "@/components/song/SongLevels.vue";
import Best50Records from "@/components/record/Best50Records.vue";
import PlayRecords from "@/components/record/PlayRecords.vue";
import messages from "@/utils/message";
import { pinia } from "@/utils/store";

import "element-plus/theme-chalk/el-message-box.css"
import 'element-plus/theme-chalk/dark/css-vars.css'
import "element-plus/theme-chalk/el-message.css"
import 'element-plus/theme-chalk/display.css'
import About from "@/components/info/About.vue";

const app= createApp(App)

const routes = [
    {
      path: '/',
      component: About
    },
    {
        path: '/best50',
        component: Best50Records,
    },
    {
        path: '/records',
        component: PlayRecords,
    },
    {
        path: '/songs',
        component: SongLevels,
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

const navLang = navigator.language.substring(0, 2)

const i18n = createI18n({
    locale: navLang,
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
