import axios from "axios";
import { BACKEND_URL } from '../constant'
import { token } from './vaccinatedUser'
const baseUrl = `${BACKEND_URL}/products`

let totalPages = 0

const products = async (page = 0) => {
    const config = {
        headers: { accessToken: token }
    }
    const response = await axios.get(`${baseUrl}?pages=${page}&total=${totalPages}`, config)
    totalPages = response.data.counts
    return response.data
}

const product = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const deleteProduct = async (id) => {
    const config = {
        headers: { accessToken: token }
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

const createProduct = async (newProduct) => {
    const config = {
        headers: { accessToken: token }
    }
    const response = await axios.post(baseUrl, newProduct, config)
    return response.data
}

const editProduct = async (id, newProduct, photo) => {
    const config = {
        headers: { accessToken: token }
    }
    const response = await axios.put(`${baseUrl}/${id}`, { data: newProduct, photo }, config)
    return response.data
}

const imageUpload = async (formData) => {
    const config = {
        headers: { accessToken: token }
    }
    const response = await axios.post(baseUrl+'/upload', formData, config)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    products,
    product,
    deleteProduct,
    createProduct,
    imageUpload,
    editProduct
}