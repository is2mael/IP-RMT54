import axios from "axios"

export const pull = axios.create({
    baseURL: "http://localhost:3000"
})