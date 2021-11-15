import axios from "axios";

import commonApi from "./commonApi";

export const sAdminPortfolioApi = {
    sAdminGetPortfolioList(token) {
        return axios.get(commonApi.api + "api/admin/portfolios", token);
    },

    sAdminGetPortfolioDetails(id, token) {
        return axios.get(commonApi.api + "api/admin/portfolios/" + id, token);
    },

    sAdminAddPortfolio(data, token) {
        return axios.post(commonApi.api + "api/admin/portfolios", data, token);
    },

    sAdminUpdatePortfolioDetails(id, data, token) {
        return axios.put(commonApi.api + "api/admin/portfolios/" + id, data, token);
    },

    sAdminDeletePortfolio(id, token) {
        return axios.delete(commonApi.api + "api/admin/portfolios/" + id, token);
    },
};