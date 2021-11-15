import axios from "axios";

import commonApi from "./commonApi";

export const sAdminServiceTextApi = {
    sAdminGetServiceTextDetails(token) {
        return axios.get(commonApi.api + "api/admin/serviceText", token);
    },

    sAdminUpdateServiceTextDetails(data, token) {
        return axios.put(commonApi.api + "api/admin/serviceText", data, token);
    },
};