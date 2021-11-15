import axios from "axios";

import commonApi from "./commonApi";

export const sAdminCompanyDetailApi = {
    sAdminGetCompanyDetailDetails(token) {
        return axios.get(commonApi.api + "api/admin/companyDetail", token);
    },

    sAdminUpdateCompanyDetailDetails(data, token) {
        return axios.put(commonApi.api + "api/admin/companyDetail", data, token);
    },
};