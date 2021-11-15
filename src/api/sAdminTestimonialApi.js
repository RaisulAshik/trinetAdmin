import axios from "axios";

import commonApi from "./commonApi";

export const sAdminTestimonialApi = {
    sAdminGetTestimonialList(token) {
        return axios.get(commonApi.api + "api/admin/testimonials", token);
    },

    sAdminGetTestimonialDetails(id, token) {
        return axios.get(commonApi.api + "api/admin/testimonials/" + id, token);
    },

    sAdminAddTestimonial(data, token) {
        return axios.post(commonApi.api + "api/admin/testimonials", data, token);
    },

    sAdminUpdateTestimonialDetails(id, data, token) {
        return axios.put(
            commonApi.api + "api/admin/testimonials/" + id,
            data,
            token
        );
    },

    sAdminDeleteTestimonial(id, token) {
        return axios.delete(commonApi.api + "api/admin/testimonials/" + id, token);
    },
};