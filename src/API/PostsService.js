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
        console.log(`${config.url}/api/TypeOfGarbage/GetAllWithImage`)
        const response = await axios.get(`${config.url}/api/TypeOfGarbage/GetAllWithImage`, requestConfig)
        console.log(response.data)
        return response
    }

    static async getGarbageCollectionPoint(token) {
        const requestConfig = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.get(`${config.url}/api/GarbageCollectionPoint/GetAll?GetWithImage=true&PageSize=100`, requestConfig)
        console.log(response.data)
        return response
    }
}