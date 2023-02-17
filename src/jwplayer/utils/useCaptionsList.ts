import { useContext, useState, useEffect } from 'react';
import { CaptionsList, OnCaptionsEventData } from 'jwplayer/types';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';

export default function useCaptionsList(): CaptionsList {
	const { player } = useContext(PlayerContext);
	const [captionsList, setCaptionsList] = useState<CaptionsList>();

	useEffect(() => {
		player?.on('captionsList', (event: OnCaptionsEventData) => {
			setCaptionsList(event.tracks);
		});

		return () => {
			player?.off('captionsList', (event: OnCaptionsEventData) => {
				setCaptionsList(event.tracks);
			});
		};
	}, [player]);

	return captionsList;
}
