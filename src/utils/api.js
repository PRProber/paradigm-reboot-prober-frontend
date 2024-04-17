import axios from "axios";
import { useUserStore } from "@/utils/store";
import { pinia } from "@/utils/store";

const beforeRequest = config => {
    const userStore = useUserStore(pinia)
    config.headers.Authorization = userStore.access_token
    return config
}

const API_BASE = 'https://api.prp.icel.site/api/v1';
let client = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': 'https://api.prp.icel.site',
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

export const getBestRecords = (username) => {
    return client.get('/records/' + username, {
        params: { best: true }
    })
}

export const postRecord = (username, formData) => {
    return client.post(
            '/records/'+username,
            {
                play_records: formData
            }
        )
}

export const getBest50Image = (username) => {
    return client.get(
        '/records/'+username+'/export/b50',
        { responseType: "blob" }
    )
}

export const getB50Trending = (username, scope = 'month') => {
    return client.get('/statistics/' + username + '/b50', {
        params: { scope: scope }
    })
}