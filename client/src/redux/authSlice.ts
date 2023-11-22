import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: "auth", 
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            isError: false
        },
        register: {
            isFetching: false,
            isError: false 
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.isError = false 
            state.login.currentUser = action.payload
        },
        loginFailed: (state) => {
            state.login.isFetching = false 
            state.login.isError = true
        },
        registerStart: (state) => {
            state.register.isFetching = true
        },
        registerSuccess: (state, user) => {
            state.register.isFetching = false 
            state.register.isError = false 
        },
        registerError: (state) => {
            state.register.isFetching= false
            state.register.isError = true
        }
    }
})


export const { loginSuccess, loginStart, loginFailed, registerError, registerStart, registerSuccess } = authSlice.actions

export default authSlice.reducer