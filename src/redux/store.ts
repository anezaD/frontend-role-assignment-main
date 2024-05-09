import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "@redux-saga/core";
import {notificationReducer}  from './game/reducer';
import gameReducer  from './game/reducer';
import { GameState, NotificationState } from './game/types';

const sagaMiddleware = createSagaMiddleware();

export type StateType = {
    game: GameState;
    notification: NotificationState;
};

const rootReducers = {
    game: gameReducer,
    notification: notificationReducer,
};

const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
