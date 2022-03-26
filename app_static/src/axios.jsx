import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const url = "http://localhost:8000/"

export async function getTable() {
    return await axios.get(url)
}

export async function createRow(data) {
    return await axios.post(url, data)
}