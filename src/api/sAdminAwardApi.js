import axios from "axios";

import commonApi from "./commonApi";

export const sAdminAwardApi = {
    sAdminGetAwardList(token) {
        return axios.get(commonApi.api + "api/admin/awards", token);
    },

    sAdminGetAwardDetails(id, token) {
        return axios.get(commonApi.api + "api/admin/awards/" + id, token);
    },

    sAdminAddAward(data, token) {
        return axios.post(commonApi.api + "api/admin/awards", data, token);
    },

    sAdminUpdateAwardDetails(id, data, token) {
        return axios.put(commonApi.api + "api/admin/awards/" + id, data, token);
    },

    sAdminDeleteAward(id, token) {
        return axios.delete(commonApi.api + "api/admin/awards/" + id, token);
    },
};