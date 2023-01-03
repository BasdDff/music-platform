import axios from "axios"

const $api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000"
    // headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token')}`
    // }
})

// $api.interceptors.request.use((config) => {
//     if (config.headers) {
//         config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
//         return config
//     }
// })

export default $api