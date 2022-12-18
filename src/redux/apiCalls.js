import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "./userRedux"
import { publicRequest } from '../requestMethod'

export const login = async (dispatch, user)=>{
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/api/login", user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
}

export const register = async (dispatch, user)=>{
    dispatch(registerStart());
    try {
        const res = await publicRequest.post("/api/register")
        dispatch(registerSuccess(res.data));
    } catch (error) {
        dispatch(registerFailure());
    }
}