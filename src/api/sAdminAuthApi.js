import axios from "axios";

import commonApi from "./commonApi";

export const sAdminAuthApi = {
    sAdminLogin(data) {
        return axios.post(commonApi.api + "api/admin/login", data);
    },
};