import axios from "axios";
import { useUserStore } from "@/utils/store";

const userStore = useUserStore()

const createAxiosClient = (access_token) => {
    return axios.create({
        baseURL: API_BASE,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }
    })
}

const API_BASE = 'http://localhost:8000/api/v1';
let client = createAxiosClient('');

userStore.$subscribe((mutation, state) => {
    client = createAxiosClient(state.access_token)
})

export default {
    methods: {
        // User
        login(username, password) {
            return client.post('/user/login', {
                username: username,
                password: password,
            })
        },
        register(username, email, password) {
            return client.post('/user/register', {
                username: username,
                email: email,
                password: password,
            })
        },
        getMyInfo() {
            return client.get('/user/me')
        },

        // Song
        getAllSongLevels() {
            return client.get('/songs')
        },
        createSong(formData) {
            return client.post('/songs', formData)
        },
        updateSong(formData) {
            return client.patch('/songs', formData)
        },

        // Record
        getAllRecords(username) {
            return client.get('/records' + username)
        },
        getAllBestRecords(username) {
            return client.get('/records + username', {
                params: { best: true }
            })
        },
        getBest50Records(underflow = 0) {
            return client.get('/user/records', {
                params: { b50: true, underflow: underflow }
            })
        },
        postRecord(formData) {
            return client.post('/user/records', formData)
        }

    }
}