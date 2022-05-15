import axios from "axios";
import config from "../config";

export default class PostsService {
    static async getAll(limit = 10, page = 1) {
        const response = await axios.get(config.postsUrl + '/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        })
        return response
    }

    static async getById(id) {
        const response = await axios.get(`${config.postsUrl}/posts/${id}`)
        return response
    }

    static async getCommentsByPostId(id) {
        const response = await axios.get(`${config.postsUrl}/posts/${id}/comments`)
        return response
    }

    static async authorize(credentials) {
        const response = await axios.post(
            `${config.url}/api/User/Authorization`,
            {email: credentials.email, password: credentials.password}
        ).catch(err => {
            return null
        })

        if (response) {
            return response.data;
        }

        return null
    }

    static async getTypesOfGarbage(token) {
        const requestConfig = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.get(`${config.url}/api/TypeOfGarbage/GetAllWithImage`, requestConfig)
        return response
    }

    static async getGarbageCollectionPoint(token) {
        const requestConfig = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.get(`${config.url}/api/GarbageCollectionPoint/GetAll?GetWithImage=true&PageSize=100`, requestConfig)
        return response
    }

    static async getCompanies(token) {
        const requestConfig = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.get(`${config.url}/api/Company/GetAll`, requestConfig)
        return response
    }

    static async getGarbageCollectionPointById(token, id) {
        const requestConfig = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.get(`${config.url}/api/GarbageCollectionPoint/GetById/${id}`, requestConfig)

        return response
    }

    static async getCommentsByGarbageCollectionPointId(token, id) {
        const requestConfig = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.get(`${config.url}/api/Comment/GetAllByGCPId/${id}`, requestConfig)
        return response
    }
}