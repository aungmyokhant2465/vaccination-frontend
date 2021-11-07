/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"
import { BACKEND_URL } from '../constant'
const baseUrl = `${BACKEND_URL}/users`
// const baseUrl = 'http://localhost:4000/users'

export let token = null
let totalPages = 0

export const setToken = newToken => {
    token = newToken
}

const vaccinatedUsers = async (page = 0) => {
    const config = {
        headers: { accessToken: token }
    }
    const response = await axios.get(`${baseUrl}?pages=${page}&totalPages=${totalPages}`, config)
    totalPages = response.data.counts
    return response.data
}

const vaccinatedUser = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const createVaccinatedUser = async (newVaccinatedUser) => {
    const config = {
        headers: { accessToken: token }
    }
    const response = await axios.post(baseUrl, newVaccinatedUser, config)
    return response.data
}

const imageUpload = async (formData) => {
    const config = {
        headers: { accessToken: token }
    }
    const response = await axios.post(baseUrl+'/upload', formData, config)
    return response.data
}

const incrCount = async (id, qrcount) => {
    const response = await axios.put(`${baseUrl}/qrcount/${id}/`, { ...qrcount, previous_count: qrcount.times })
    return response.data
}

const countUsers = async () => {
    const config = {
        headers: { accessToken: token }
    }
    const response = await axios.get(`${baseUrl}/count_users`, config)
    return response.data
}

const deleteVaccinatedUser = async (id) => {
    const config = {
        headers: { accessToken: token }
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

// const firstAndSecondVaccinatedUsers = async () => {
//     const config = {
//         headers: { accessToken: token }
//     }
//     const response1 = await axios.get(baseUrl+'/first_vaccineted', config)
//     const response2 = await axios.get(baseUrl+'/second_vaccinated', config)
//     return {
//         first: response1.data.data,
//         second: response2.data.data
//     }
// }

const vaccinated = async () => {
    const config = {
        headers: {accessToken: token}
    }
    const response = await axios.get(baseUrl + '/vaccinated', config)
    return response.data.data
}

const excelUpload = async (formData) => {
    const config = {
        headers: { accessToken: token }
    }
    const response = await axios.post(baseUrl+'/upload-excel', formData, config)
    return response.data
}
// %2F
const findByNrc = async (nrc) => {
    const response = await axios.get(`${baseUrl}/find/${nrc.replace('/', '%2F')}`)
    return response.data
}

export default {
    vaccinatedUsers,
    vaccinatedUser,
    createVaccinatedUser,
    incrCount,
    countUsers,
    deleteVaccinatedUser,
    vaccinated,
    imageUpload,
    excelUpload,
    findByNrc
}