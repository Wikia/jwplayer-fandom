import React from 'react';
import { Player } from 'types';
interface PlayerContextInterface {
    player: Player;
    setPlayer: (playerInstance: any) => void;
}
export declare const PlayerContext: React.Context<PlayerContextInterface>;
export {};
