import { toast } from 'react-toastify';
import { loginApi } from '../../services/UserService';

export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN'
export const FETCH_USER_SUCESS = 'FETCH_USER_SUCESS'
export const FETCH_USER_FAIL = 'FETCH_USER_FAIL'

export const USER_LOGOUT = 'USER_LOGOUT'

export const USER_REFRESH = 'USER_REFRESH'

export const handleLoginRedux = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_USER_LOGIN })

        let res = await loginApi(email.trim(), password)
        if (res && res.token) {

            // localStorage.setItem('email', email.trim())
            // localStorage.setItem('token', res.token)

            dispatch({
                type: FETCH_USER_SUCESS,
                data: {
                    email: email.trim(),
                    token: res.token,
                }
            })
        } else {
            toast.error("Email or Password is required!")
            dispatch({
                type: FETCH_USER_FAIL
            })
        }
    }
}

export const handleLogoutRedux = () => {
    return async (dispatch, getState) => {
        dispatch({ type: USER_LOGOUT })
    }
}

export const handleRefresh = () => {
    return async (dispatch, getState) => {
        dispatch({ type: USER_REFRESH })
    }
}