import axios from "axios";
import { useUserStore } from "@/utils/store";
import { pinia } from "@/utils/store";

const beforeRequest = config => {
    const userStore = useUserStore(pinia)
    config.headers.Authorization = userStore.access_token
    return config
}

const API_BASE = 'http://127.0.0.1:8000/api/v1';
export const uploadCsvUrl = API_BASE + '/upload/csv'
export const uploadImgUrl = API_BASE + '/upload/img'

let client = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://api.prp.icel.site',
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

export const updateMyInfo = (formData) => {
    return client.patch('/user/me', formData)
}

export const refreshUploadToken = () => {
    return client.post('/user/me/upload-token')
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

export const getRecords = (username,
                           scope='best',
                           page_size= 30,
                           page_index= 1,
                           sort_by = 'date',
                           order = 'desc') => {
    return client.get('/records/' + username, {
        params: {
            scope: scope,
            page_size: page_size,
            page_index: page_index,
            sort_by: sort_by,
            order: order,
        }
    })
}

export const getBestRecords = (username) => {
    return client.get('/records/' + username, {
        params: { best: true }
    })
}

export const postRecord = (username, formData, is_replace) => {
    return client.post(
            '/records/'+username,
            {
                is_replace: is_replace,
                play_records: formData
            }
        )
}

export const postCsvRecord = (username, csv_filename) => {
    return client.post('/records/'+username, {
        csv_filename: csv_filename
    })
}

export const getCsv = (username) => {
    return client.get(
        '/records/'+username+'/export/csv',
        { responseType: "blob" }
    )
}

export const uploadCsv = (formData) => {
    return client.post('/upload/csv', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
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