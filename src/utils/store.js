import { defineStore } from "pinia";
import { ref } from "vue"

export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            username: '',
            access_token: '',
            is_admin: false,
            logged_in: false
        }
    }
})

export const useStore = defineStore('store', {
    state: () => {
        return {
            levels: null,
        }
    }
})