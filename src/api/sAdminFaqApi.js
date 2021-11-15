import axios from "axios";

import commonApi from "./commonApi";

export const sAdminFaqApi = {
    sAdminGetFaqList(token) {
        return axios.get(commonApi.api + "api/admin/faqs", token);
    },

    sAdminGetFaqDetails(faqId, token) {
        return axios.get(commonApi.api + "api/admin/faqs/" + faqId, token);
    },

    sAdminAddFaq(data, token) {
        return axios.post(commonApi.api + "api/admin/faqs", data, token);
    },

    sAdminUpdateFaqDetails(faqId, data, token) {
        return axios.put(commonApi.api + "api/admin/faqs/" + faqId, data, token);
    },

    sAdminDeleteFaq(faqId, token) {
        return axios.delete(commonApi.api + "api/admin/faqs/" + faqId, token);
    },
};