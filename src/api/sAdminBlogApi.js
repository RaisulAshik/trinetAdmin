import axios from "axios";

import commonApi from "./commonApi";

export const sAdminBlogApi = {
    sAdminGetBlogList(token) {
        return axios.get(commonApi.api + "api/admin/blogs", token);
    },

    sAdminGetBlogDetails(id, token) {
        return axios.get(commonApi.api + "api/admin/blogs/" + id, token);
    },

    sAdminAddBlog(data, token) {
        return axios.post(commonApi.api + "api/admin/blogs", data, token);
    },

    sAdminUpdateBlogDetails(id, data, token) {
        return axios.put(commonApi.api + "api/admin/blogs/" + id, data, token);
    },

    sAdminDeleteBlog(id, token) {
        return axios.delete(commonApi.api + "api/admin/blogs/" + id, token);
    },
};