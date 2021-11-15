import axios from "axios";

import commonApi from "./commonApi";

export const sAdminTeamTextApi = {
    sAdminGetTeamTextDetails(token) {
        return axios.get(commonApi.api + "api/admin/teamText", token);
    },

    sAdminUpdateTeamTextDetails(data, token) {
        return axios.put(commonApi.api + "api/admin/teamText", data, token);
    },
};