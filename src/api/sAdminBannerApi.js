import axios from "axios";

import commonApi from "./commonApi";

export const sAdminBannerApi = {
    sAdminGetBannerList(token) {
        return axios.get(commonApi.api + "api/admin/banner", token);
    },

    // sAdminGetProductSliderImageDetails(productSliderImageId, token) {
    //     return axios.get(
    //         commonApi.api +
    //         apiList.S_ADMIN_GET_PRODUCT_SLIDER_IMAGE_DETAILS +
    //         productSliderImageId,
    //         token
    //     );
    // },

    // sAdminAddProductSliderImage(data, token) {
    //     return axios.post(
    //         commonApi.api + apiList.S_ADMIN_ADD_PRODUCT_SLIDER_IMAGE,
    //         data,
    //         token
    //     );
    // },

    sAdminUpdateBannerDetails(data, token) {
        return axios.put(commonApi.api + "api/admin/banner", data, token);
    },

    // sAdminDeleteProductSliderImage(productSliderImageId, token) {
    //     return axios.delete(
    //         commonApi.api +
    //         apiList.S_ADMIN_ADD_PRODUCT_SLIDER_IMAGE +
    //         productSliderImageId,
    //         token
    //     );
    // },
};