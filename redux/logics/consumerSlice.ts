import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import jwt_decode from 'jwt-decode'

interface CredType {
    creds: any,
    token: string,
    consumer: any
}

const initialState: CredType = {
    creds: null,
    token: '',
    consumer: null
}

export const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        authenticate: (state, { payload }) => {
            const decoded = jwt_decode(payload.access_token)
            state.creds = decoded
            state.token = payload.access_token
        },
        profile: (state, { payload }) => {
            state.consumer = payload
        },
        logout: (state) => {
            state.creds = null,
            state.token = '',
            state.consumer = null
        }
    }
})

export const { authenticate, profile, logout } = LoginSlice.actions
export const Cred = (state: RootState) => state.login
export default LoginSlice.reducer