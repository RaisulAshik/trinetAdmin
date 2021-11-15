import axios from "axios";

import commonApi from "./commonApi";

export const sAdminTeamApi = {
    sAdminGetTeamList(token) {
        return axios.get(commonApi.api + "api/admin/teams", token);
    },

    sAdminGetTeamDetails(id, token) {
        return axios.get(commonApi.api + "api/admin/teams/" + id, token);
    },

    sAdminAddTeam(data, token) {
        return axios.post(commonApi.api + "api/admin/teams", data, token);
    },

    sAdminUpdateTeamDetails(id, data, token) {
        return axios.put(commonApi.api + "api/admin/teams/" + id, data, token);
    },

    sAdminDeleteTeam(id, token) {
        return axios.delete(commonApi.api + "api/admin/teams/" + id, token);
    },
};