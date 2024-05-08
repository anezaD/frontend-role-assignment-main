import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import gameReducer from './game/reducer';
import { GameState } from './game/types';

const sagaMiddleware = createSagaMiddleware();

export type StateType = {
    game: GameState;
};

const rootReducers = {
    game: gameReducer,
};

const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
