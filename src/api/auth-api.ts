import $api from "../http";

export const authApi = {
    getAuth() {
        return $api.get(`/user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    },
    login(user: { email: string, password: string }) {
        return $api.post(`/auth/signIn`, user)
    }
}