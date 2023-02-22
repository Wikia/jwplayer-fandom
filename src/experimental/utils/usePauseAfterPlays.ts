import { useEffect, useContext } from 'react';
import useStateRef from 'experimental/utils/useStateRef';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import JWEvents from 'jwplayer/players/shared/JWEvents';

export default function usePauseAfterPlays(pauseAfter: number) {
	const { player } = useContext(PlayerContext);
	const [, setTotalPlays, totalPlaysRef] = useStateRef(0);
	const [, setNextPause, nextPauseRef] = useStateRef(pauseAfter);

	useEffect(() => {
		player?.on(JWEvents.FIRST_FRAME, (): void => {
			if (totalPlaysRef.current === nextPauseRef.current) {
				setNextPause(nextPauseRef.current + pauseAfter);
				player?.pause();
			}
			setTotalPlays(totalPlaysRef.current + 1);
		});
	}, [player]);
}
