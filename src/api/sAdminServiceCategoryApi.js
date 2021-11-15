import axios from "axios";

import commonApi from "./commonApi";

export const sAdminServiceCategoryApi = {
    sAdminGetServiceCategoryList(token) {
        return axios.get(commonApi.api + "api/admin/serviceCategories", token);
    },

    sAdminGetServiceCategoryDetails(id, token) {
        return axios.get(
            commonApi.api + "api/admin/serviceCategories/" + id,
            token
        );
    },

    sAdminAddServiceCategory(data, token) {
        return axios.post(
            commonApi.api + "api/admin/serviceCategories",
            data,
            token
        );
    },

    sAdminUpdateServiceCategoryDetails(id, data, token) {
        return axios.put(
            commonApi.api + "api/admin/serviceCategories/" + id,
            data,
            token
        );
    },

    sAdminDeleteServiceCategory(id, token) {
        return axios.delete(
            commonApi.api + "api/admin/serviceCategories/" + id,
            token
        );
    },
};