
export type Player = {
    id: number;
    name: string;
    position: {
        latitude: number;
        longitude: number;
    };
    teamName: string;
};

export type GameState = {
    data: Player[];
};

export type NotificationState = {

  notification: {
    name: string;
    id: number;
    team: string;
  } | null;

}
