import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import JWEvents from 'jwplayer/players/shared/JWEvents';
import useStateRef from 'experimental/utils/useStateRef';

export default function usePlaying(): boolean {
	const [playing, setPlaying] = useState(false);
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		if (player?.getState() === 'playing') {
			setPlaying(true);
		}

		player?.on(JWEvents.PLAY, () => {
			setPlaying(true);
		});
		player?.on(JWEvents.PAUSE, () => {
			setPlaying(false);
		});
	}, [player]);

	return playing;
}

export function usePlayingStateRef(): [boolean, React.RefObject<boolean>] {
	const [playing, setPlaying, playingRef] = useStateRef(false);
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		if (player?.getState() === 'playing') {
			setPlaying(true);
		}

		player?.on(JWEvents.PLAY, () => {
			setPlaying(true);
		});
		player?.on(JWEvents.PAUSE, () => {
			setPlaying(false);
		});
	}, [player]);

	return [playing, playingRef];
}
