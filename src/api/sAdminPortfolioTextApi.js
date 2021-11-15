import axios from "axios";

import commonApi from "./commonApi";

export const sAdminPortfolioTextApi = {
    sAdminGetPortfolioTextDetails(token) {
        return axios.get(commonApi.api + "api/admin/portfolioText", token);
    },

    sAdminUpdatePortfolioTextDetails(data, token) {
        return axios.put(commonApi.api + "api/admin/portfolioText", data, token);
    },
};