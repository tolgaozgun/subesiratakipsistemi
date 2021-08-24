import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token: "",
    expirationTime: 0,
    id: -1,
    name: "",
    authType: "",
    email: "",
}


const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;

    return remainingDuration;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const authType = localStorage.getItem("authType");
    const id = localStorage.getItem("id");

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 3600) {
        localStorage.removeItem('email');
        localStorage.removeItem('token')
        localStorage.removeItem('name');
        localStorage.removeItem('id');
        localStorage.removeItem('authType');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token: storedToken,
        expiry: remainingTime,
        name,
        email,
        authType,
        id,
    };
};

const authSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {
            login(state, action) {
                state.email = action.payload.email;
                state.token = action.payload.token;
                state.expiry = action.payload.expiry;
                state.name = action.payload.name;
                state.authType = action.payload.authType
                state.id = action.payload.id;
                localStorage.setItem('id', action.payload.id);
                localStorage.setItem('email', action.payload.email);
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('authType', action.payload.authType);
                localStorage.setItem('name', action.payload.name);
                localStorage.setItem('expirationTime', action.payload.expiry);
            },
            logout(state) {
                state.token = null;
                state.expiry = null;
                state.email = null;
                state.name = null;
                state.authType = null;
                state.id = null;
                localStorage.removeItem('id');
                localStorage.removeItem('email');
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                localStorage.removeItem('expirationTime');
                localStorage.removeItem('authType');
            },
            checkSession(state) {
                const tokenData = retrieveStoredToken();
                if (tokenData) {
                    state.email = tokenData.email;
                    state.token = tokenData.token;
                    state.expiry = tokenData.expiry;
                    state.name = tokenData.name;
                    state.authType = tokenData.authType;
                    state.id = tokenData.id;
                }
            }
        }
    }
)


export const authActions = authSlice.actions;
export default authSlice;