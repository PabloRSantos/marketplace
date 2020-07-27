import axios from "axios"

const api = axios.create({
    baseURL: "https://lojavirtual-backend.herokuapp.com/"
})

export default api