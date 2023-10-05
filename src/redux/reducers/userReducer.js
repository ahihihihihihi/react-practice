import { FETCH_USER_LOGIN, FETCH_USER_SUCESS, FETCH_USER_FAIL, USER_LOGOUT, USER_REFRESH } from "../actions/userAction";


const INITIAL_STATE = {

    account: {
        email: '',
        auth: null,
        token: ''
    },
    isLoading: false,
    isError: false

};

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH_USER_LOGIN:

            return {

                ...state,
                isLoading: true,
                isError: false
            };

        case FETCH_USER_SUCESS:
            console.log(">>> CHECK ACTION FETCH_USER_SUCESS: ", action)
            return {
                ...state,
                account: {
                    email: action.data.email,
                    token: action.data.token,
                    auth: true
                },
                isLoading: false,
                isError: false
            };
        case FETCH_USER_FAIL:

            return {
                ...state,
                account: {
                    auth: null
                },
                isLoading: false,
                isError: true
            };
        case USER_LOGOUT:
            // localStorage.removeItem('email')
            // localStorage.removeItem('token')
            console.log(">>> CHECK ACTION USER_LOGOUT: ", action)
            return {
                ...state,
                account: {
                    email: '',
                    auth: false,
                    token: ''
                },
            };
        case USER_REFRESH:
            console.log(">>> CHECK ACTION USER_REFRESH: ", action)
            return {
                ...state,
                account: {
                    email: localStorage.getItem('email'),
                    auth: true,
                    token: localStorage.getItem('token')
                },
            };
        default: return state;

    }

};

export default userReducer;