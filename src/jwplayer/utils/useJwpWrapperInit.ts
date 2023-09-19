import { useEffect, useState } from 'react';
import getSponsoredVideos from 'utils/getSponsoredVideos';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';

interface WindowWithSponsoredVideos extends Window {
	sponsoredVideos?: string[];
}

declare let window: WindowWithSponsoredVideos;

export default function useJwpWrapperInit(loadEmbed: () => void, shouldLoadSponsoredContentList: boolean) {
	const [loadEmbedExecuted, setLoadEmbedExecuted] = useState(false);

	useEffect(() => {
		if (shouldLoadSponsoredContentList) {
			const retrieveSponsoredVideo = async () => {
				if (window?.sponsoredVideos?.length > 0) {
					console.debug('sponsoredVideos already retrieved');
					return;
				}

				const sponsoredVideoResponse = await getSponsoredVideos();
				if (sponsoredVideoResponse && typeof window !== undefined) {
					window.sponsoredVideos = sponsoredVideoResponse;
					console.debug('Retrieved sponsoredVideos list');
				} else {
					console.debug(
						'Could not set sponsored videos. Either window the fetched sponsoredVideo list were undefined.',
					);
				}
			};
			retrieveSponsoredVideo().catch((e) => {
				console.error('There was an issue with retrieving Sponsored Videos. ', e);
			});
		} else {
			console.debug('Loading of Sponsored Content Video List was disabled.');
		}
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_INIT_RENDER);
		loadEmbed();
		setLoadEmbedExecuted(true);
	}, []);

	return loadEmbedExecuted;
}
