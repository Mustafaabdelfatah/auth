import axios from 'axios'
import { getCookie } from '@/composables/useCookies'
import storage from '@/composables/useStorage'
import { useAuthStore } from '@/stores/auth'

const locale = storage.get('locale')
const instance = axios.create({
    isFile: false,
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept-language': locale
    }
})
//3
instance.interceptors.request.use((config) => {
    const token = getCookie('token')

    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
    }
    if (config.isFile) {
        config.headers['Content-Type'] = 'multipart/form-data'
    }
    return config
})

instance.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        switch (error.response.status) {
            case 401: // Unauthorized
                console.log('Unauthorized')
                useAuthStore().flush()
                break
            case 403: // Forbidden
                console.log('Not Have Premissions')
                break
            case 422: // Unprocessable Content
                console.log('Not Have Premissions')
                break
            case 404: // Request Not Found
                console.log('No Have Data')
                break
            case 500: // Server Error
                // window.location.replace("/server-error");
                break
        }
        return Promise.reject(error)
    }
)

export default instance
