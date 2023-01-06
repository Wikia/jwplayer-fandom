import { useContext, useState, useEffect } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { OnCaptionsEventData } from 'jwplayer/types';

export default function useCurrentCaption(): number {
	const { player } = useContext(PlayerContext);
	const [currentCaption, setCurrentCaption] = useState<number>(player?.getCurrentCaptions());

	useEffect(() => {
		player?.on('captionsChanged', (event: OnCaptionsEventData) => {
			setCurrentCaption(event.track);
		});

		return () => {
			player?.off('captionsChanged', (event: OnCaptionsEventData) => {
				setCurrentCaption(event.track);
			});
		};
	}, [player]);

	return currentCaption;
}
