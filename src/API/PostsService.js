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

    static async writeComment(user, text, idGarbageCollectionPoint) {

        const requestConfig = {
            headers: {
                authorization: `Bearer ${user.token}`,
            },
        }

        const payload = {
            id: 0,
            text: text,
            idGarbageCollectionPoint: idGarbageCollectionPoint,
            idClient: user.id
        }

        const response = await axios.put(`${config.url}/api/Comment/WriteComment`, payload, requestConfig)

        return response
    }

    static async getGarbageCollectionPointByClientId(token, userId) {
        const requestConfig = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.get(`${config.url}/api/GarbageCollectionPoint/GetByClientId/${userId}`, requestConfig)

        return response
    }

    static async createGarbageCollectionPoint(user, payload) {

        const requestConfig = {
            headers: {
                authorization: `Bearer ${user.token}`,
            },
        }
        const companyResponse = await this.getCompanyByClientId(user.token, user.id)
        const company = companyResponse.data
        payload.idCompany = company.id

        const response = await axios.put(`${config.url}/api/GarbageCollectionPoint/CreateGCP`, payload, requestConfig).catch((error) => {
            return {
                message: error.message,
                status: 400
            };
        })
        return response;
    }

    static async getCompanyByClientId(token, id) {
        const requestConfig = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.get(`${config.url}/api/Company/GetByClientId/${id}`, requestConfig)
        return response
    }

    static async deleteGarbageCollectionPoint(token, id) {
        const requestConfig = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.delete(`${config.url}/api/GarbageCollectionPoint/DeleteGCP/${id}`, requestConfig)
        return response
    }
}