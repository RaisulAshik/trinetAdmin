import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import jwtDecoder from "jwt-decode";

let token = JSON.parse(localStorage.getItem("superAdminToken"));
let validToken = false;

if (token) {
    let decodedToken = jwtDecoder(token);

    if (decodedToken.exp < Date.now() / 1000) {
        localStorage.removeItem("superAdminToken");
    } else {
        validToken = true;
    }
}

const initialState = validToken ?
    {
        sidebarShow: "responsive",
        loggedIn: true,
        loggingIn: false,
        error: "",
        token: JSON.parse(localStorage.getItem("superAdminToken")),
    } :
    {};

const changeState = (state = initialState, { type, payload, ...rest }) => {
    switch (type) {
        case "set":
            return {...state, ...rest };

        case "S_ADMIN_LOGIN_REQUEST":
            return {
                ...state,
                ...rest,
                loggingIn: true,
                loggedIn: false,
                email: payload.email,
                token: JSON.parse(localStorage.getItem("superAdminToken")),
            };

        case "S_ADMIN_LOGIN_SUCCESS":
            return {
                ...state,
                ...rest,
                loggingIn: false,
                loggedIn: true,
                email: payload.email,
                token: JSON.parse(localStorage.getItem("superAdminToken")),
            };

        case "S_ADMIN_LOGIN_FAILURE":
            return {
                ...state,
                ...rest,
                loggingIn: false,
                loggedIn: false,
                email: null,
                error: payload.error.response,
                token: JSON.parse(localStorage.getItem("superAdminToken")),
            };

        case "S_ADMIN_LOGOUT":
            return {};

        default:
            return state;
    }
};

// const store = createStore(changeState);

const store = createStore(changeState, applyMiddleware(thunkMiddleware));

export default store;