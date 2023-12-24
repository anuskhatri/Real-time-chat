import axios from 'axios'

export const baseUrl = 'http://localhost:4000'

export const postReq = async (url, userData) => {
    const response = await axios.post(url, userData)
    if (response.data?.error) {
        return { error: true, data: response.data }
    }
    else {
        return { error: false, data: response.data }
    }
}

export const getReq = async (url) => {
    const response = await axios.get(url)
    if (response.statusText!='OK'){
        let message = "An error occured"
        return {error:"true",message}
    }
    return response.data

}