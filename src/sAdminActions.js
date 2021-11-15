import { sAdminAuthApi } from "./api";

export const sAdminLoginRequest = (email) => {
    return {
        type: "S_ADMIN_LOGIN_REQUEST",
        payload: { email },
    };
};

export const sAdminLoginSuccess = (email) => {
    return {
        type: "S_ADMIN_LOGIN_SUCCESS",
        payload: { email },
    };
};

export const sAdminLoginFailure = (error) => {
    return {
        type: "S_ADMIN_LOGIN_FAILURE",
        payload: { error },
    };
};

export const sAdminLogout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem("superAdminToken");
    return { type: "S_ADMIN_LOGOUT" };
};

export const sAdminLogin = (email, password) => {
    //can return a pure or impure function, no restrictions and it receieves dispatch as an argument
    return function(dispatch) {
        dispatch(sAdminLoginRequest(email));

        const data = {
            email,
            password,
        };

        sAdminAuthApi
            .sAdminLogin(data)
            .then((response) => {
                // console.log("success response is", response);
                const token = JSON.stringify(response.data.token);

                window.localStorage.setItem("superAdminToken", token);
                dispatch(sAdminLoginSuccess(email));
            })
            .catch((error) => {
                // console.log("error is", error.response);
                dispatch(sAdminLoginFailure(error));
            });
    };
};