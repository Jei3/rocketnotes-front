import axios from "axios";

export const api = axios.create({
    baseURL: "https://rocketnotes-backend-8uvm.onrender.com"
})

