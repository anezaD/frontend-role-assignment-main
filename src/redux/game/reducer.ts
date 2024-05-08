import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, Player } from './types';

const gameInitialState: GameState = {
    data: [
        {
            id: 1,
            name: 'John',
            position: { latitude: 55.6737042, longitude: 12.5678997 },
            teamName: 'blue',
        },
        {
            id: 2,
            name: 'Alice',
            position: { latitude: 55.673515, longitude: 12.571688 },
            teamName: 'red',
        },
        {
            id: 3,
            name: 'Mike',
            position: { latitude: 55.67225, longitude: 12.568748 },
            teamName: 'blue',
        },
        {
            id: 4,
            name: 'Emily',
            position: { latitude: 55.6739968, longitude: 12.5669268 },
            teamName: 'red',
        },
        {
            id: 5,
            name: 'David',
            position: { latitude: 55.673518, longitude: 12.570086 },
            teamName: 'blue',
        },
        {
            id: 6,
            name: 'Sarah',
            position: { latitude: 55.674552, longitude: 12.5671015 },
            teamName: 'red',
        },
    ],
};

export const GET_PLAYERS = `game/getGameAction`;

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
    },
});

export const { getAddPlayerAction } = gameSlice.actions;
export default gameSlice.reducer;
