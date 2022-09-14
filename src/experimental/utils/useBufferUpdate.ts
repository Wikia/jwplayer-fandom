import { useContext, useEffect, useState } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import JWEvents from 'jwplayer/players/shared/JWEvents';

export interface BufferUpdateData {
	bufferPercent: number;
	duration: number;
	position: number;
}

const useBufferUpdate = () => {
	const [bufferData, setBufferData] = useState<BufferUpdateData>({ bufferPercent: 0, duration: 0, position: 0 });
	const { player } = useContext(PlayerContext);

	const getBufferData = (data: BufferUpdateData): void => {
		setBufferData(data);
	};

	useEffect(() => {
		player?.on(JWEvents.BUFFER_CHANGE, getBufferData);
	}, [player]);

	return bufferData;
};

export default useBufferUpdate;
