import axios from "axios";

import commonApi from "./commonApi";

export const sAdminAwardTextApi = {
    sAdminGetAwardTextDetails(token) {
        return axios.get(commonApi.api + "api/admin/awardText", token);
    },

    sAdminUpdateAwardTextDetails(data, token) {
        return axios.put(commonApi.api + "api/admin/awardText", data, token);
    },
};