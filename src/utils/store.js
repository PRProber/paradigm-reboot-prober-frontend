import { createPinia, defineStore } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            username: '',
            access_token: '',
            is_admin: false,
            logged_in: false,
            profile: null
        }
    },
    persist: true
})

export const useStore = defineStore('store', {
    state: () => {
        return {
            levels: null,
            uploadList: [],
        }
    }
})