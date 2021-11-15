import axios from "axios";

import commonApi from "./commonApi";

export const sAdminPrivacyPolicyApi = {
    sAdminGetPrivacyPolicyDetails(token) {
        return axios.get(commonApi.api + "api/admin/privacyPolicy", token);
    },

    sAdminUpdatePrivacyPolicyDetails(data, token) {
        return axios.put(commonApi.api + "api/admin/privacyPolicy", data, token);
    },
};