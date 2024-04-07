import axios from "axios";
import { useUserStore } from "@/utils/store";
import { pinia } from "@/utils/store";

const beforeRequest = config => {
    const userStore = useUserStore(pinia)
    config.headers.Authorization = userStore.access_token
    return config
}

const API_BASE = 'http://localhost:8000/api/v1';
let client = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8000',
        'Access-Control-Allow-Credentials': 'true',
    },
})

client.interceptors.request.use(beforeRequest)
export const login = (username, password) => {
    return client.post(
        '/user/login',
        {
            username: username,
            password: password,
        },
        {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }
    )
}

export const register = (username, email, password) => {
    return client.post('/user/register', {
        username: username,
        email: email,
        password: password,
    })
}

export const getMyInfo = () => {
    return client.get('/user/me')
}

export const getAllSongLevels = () => {
    return client.get('/songs')
}

export const getSingleSongInfo = (song_id) => {
    return client.get('/songs/' + song_id)
}

export const createSong = (formData) => {
    return client.post('/songs', formData)
}

export const updateSong = (formData) => {
    return client.patch('/songs', formData)
}

export const getAllRecords = (username) => {
    return client.get('/records/' + username)
}

export const getAllBestRecords = (username) => {
    return client.get('/records/' + username, {
        params: { best: true }
    })
}

export const getBest50Records = (underflow = 0) => {
    return client.get('/user/records', {
        params: {b50: true, underflow: underflow}
    })
}

export const postRecord = (formData = 0) => {
    return client.post('/user/records', formData)
}