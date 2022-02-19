import React from 'react';

export const PlayerContext = React.createContext({
    player: null,
    setPlayer: (playerInstance) => {},
});