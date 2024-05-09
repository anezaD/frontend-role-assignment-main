import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, Player, NotificationState } from './types';
import DATA_PLAYERS from '../../data/gamePlayers';

 const gameInitialState: GameState = {
   data: DATA_PLAYERS
};

export const gameSlice = createSlice({
    name: 'game',
    initialState: gameInitialState,
    reducers: {
        getAddPlayerAction: (
            state: GameState,
            { payload: player }: PayloadAction<Player>
        ) => {
            const newPlayers = [...state.data];
            newPlayers.push(player);
            state.data = newPlayers;
        },

        removePlayerAction: (
            state: GameState,
            { payload: playerId }: PayloadAction<number>
        ) => {
            state.data = state.data.filter(player => player.id !== playerId);
        }
    },
});

const notifInitialState: NotificationState = {
  notification: null,
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: notifInitialState,
    reducers: {
        showNotificationAction: (
            state: NotificationState,
            action: PayloadAction<{name: string; id: number; team:string }>
        ) => {
            const { name, id, team } = action.payload;
            state.notification = {
                name,
                id,
                team,
            };
        }
    },
});

export const { getAddPlayerAction, removePlayerAction } = gameSlice.actions;  
export const { showNotificationAction } = notificationSlice.actions;

const gameReducer = gameSlice.reducer;
export default gameReducer;
export const notificationReducer = notificationSlice.reducer;
