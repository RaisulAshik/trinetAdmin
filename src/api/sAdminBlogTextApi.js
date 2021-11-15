import axios from "axios";

import commonApi from "./commonApi";

export const sAdminBlogTextApi = {
    sAdminGetBlogTextDetails(token) {
        return axios.get(commonApi.api + "api/admin/blogText", token);
    },

    sAdminUpdateBlogTextDetails(data, token) {
        return axios.put(commonApi.api + "api/admin/blogText", data, token);
    },
};