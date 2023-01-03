import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import consumerSlice from './logics/consumerSlice'
import thunk from 'redux-thunk'

const combined = combineReducers({
    login: consumerSlice
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistReduce = persistReducer(persistConfig, combined)

export const store = configureStore({
    reducer: persistReduce,
    middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>