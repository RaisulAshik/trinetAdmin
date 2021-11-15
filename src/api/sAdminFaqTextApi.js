import axios from "axios";

import commonApi from "./commonApi";

export const sAdminFaqTextApi = {
    sAdminGetFaqTextDetails(token) {
        return axios.get(commonApi.api + "api/admin/faqText", token);
    },

    sAdminUpdateFaqTextDetails(data, token) {
        return axios.put(commonApi.api + "api/admin/faqText", data, token);
    },
};