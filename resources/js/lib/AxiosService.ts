import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

class AxiosService {
    private readonly instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: '/',
            timeout: 80000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    async get(endpoint: string, params = {}) {
        try {
            const response = await this.instance.get(endpoint, { params })
            return response.data
        } catch (error) {
            throw this.handleRequestError(error)
        }
    }

    async post(
        endpoint: string,
        data = {},
        additionalHeaders: Record<string, string> = {}
    ) {
        try {
            const config: AxiosRequestConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    ...additionalHeaders
                }
            }
            const response = await this.instance.post(endpoint, data, config)
            return response.data
        } catch (error) {
            throw this.handleRequestError(error)
        }
    }

    async patch(endpoint: string, data = {}) {
        try {
            const response = await this.instance.patch(endpoint, data)
            return response.data
        } catch (error) {
            throw this.handleRequestError(error)
        }
    }

    async put(endpoint: string, data = {}) {
        try {
            const response = await this.instance.put(endpoint, data)
            return response.data
        } catch (error) {
            throw this.handleRequestError(error)
        }
    }

    async delete(endpoint: string) {
        try {
            const response = await this.instance.delete(endpoint)
            return response.data
        } catch (error) {
            throw this.handleRequestError(error)
        }
    }

    handleRequestError(error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Request failed with status:', error.response.status)
            return error.response.data
        } else if (error.request) {
            // The request was made but no response was received
            console.error(
                'Request made but no response received:',
                error.request
            )
            return { error: 'No response received from server' }
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Request setup error:', error.message)
            return { error: 'Request setup error' }
        }
    }
}

export default new AxiosService()
