import axios from "axios";

import commonApi from "./commonApi";

export const sAdminTermsAndConditionApi = {
    sAdminGetTermsAndConditionDetails(token) {
        return axios.get(commonApi.api + "api/admin/termsAndCondition", token);
    },

    sAdminUpdateTermsAndConditionDetails(data, token) {
        return axios.put(
            commonApi.api + "api/admin/termsAndCondition",
            data,
            token
        );
    },
};