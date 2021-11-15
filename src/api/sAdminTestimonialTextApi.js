import axios from "axios";

import commonApi from "./commonApi";

export const sAdminTestimonialTextApi = {
    sAdminGetTestimonialTextDetails(token) {
        return axios.get(commonApi.api + "api/admin/testimonialText", token);
    },

    sAdminUpdateTestimonialTextDetails(data, token) {
        return axios.put(commonApi.api + "api/admin/testimonialText", data, token);
    },
};