import axios from "axios";

import commonApi from "./commonApi";

export const sAdminServiceSubcategoryApi = {
    sAdminGetServiceSubcategoryList(token) {
        return axios.get(commonApi.api + "api/admin/serviceSubcategories", token);
    },

    sAdminGetServiceSubcategoryDetails(id, token) {
        return axios.get(
            commonApi.api + "api/admin/serviceSubcategories/" + id,
            token
        );
    },

    sAdminAddServiceSubcategory(data, token) {
        return axios.post(
            commonApi.api + "api/admin/serviceSubcategories",
            data,
            token
        );
    },

    sAdminUpdateServiceSubcategoryDetails(id, data, token) {
        return axios.put(
            commonApi.api + "api/admin/serviceSubcategories/" + id,
            data,
            token
        );
    },

    sAdminDeleteServiceSubcategory(id, token) {
        return axios.delete(
            commonApi.api + "api/admin/serviceSubcategories/" + id,
            token
        );
    },
};