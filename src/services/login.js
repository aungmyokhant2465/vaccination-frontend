/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"
import { token } from "./vaccinatedUser"
import { BACKEND_URL } from '../constant'
const baseUrl = `${BACKEND_URL}/users/`

const login = async credential => {
    const response = await axios.post(baseUrl+'/login', credential)
    return response.data
}

const register = async credential => {
    const config = {
        headers: { accessToken: token }
    }
    const response = await axios.post(baseUrl+'/register', credential, config)
    return response.data
}

export default {
    login,
    register
}