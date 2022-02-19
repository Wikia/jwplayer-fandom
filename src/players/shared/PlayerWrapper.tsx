import React, {useState} from 'react';
import { PlayerContext } from './PlayerContext';

const PlayerWrapper = ({ children }) => {
    const [jwPlayer, setJwPlayer] = useState(null);

    const setPlayer = (player) => {
        setJwPlayer(player);
    };

    return (
        <PlayerContext.Provider value={{ player: jwPlayer, setPlayer: setPlayer }}>
            {children}
        </PlayerContext.Provider>
    );
}

export default PlayerWrapper;