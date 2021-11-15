import axios from "axios";

import commonApi from "./commonApi";

export const sAdminAboutUsApi = {
    sAdminGetAboutUsDetails(token) {
        return axios.get(commonApi.api + "api/admin/aboutUs", token);
    },

    sAdminUpdateAboutUsDetails(data, token) {
        return axios.put(commonApi.api + "api/admin/aboutUs", data, token);
    },
};