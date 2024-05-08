import { RootState } from '../store';

export const getGamePlayers = (state: RootState) => state.game.data;
