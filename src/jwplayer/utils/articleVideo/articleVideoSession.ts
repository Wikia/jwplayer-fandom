import Cookies from 'js-cookie';
import { setPlayerImpressionsInWiki } from 'jwplayer/utils/articleVideo/articleVideoCookies';

const videoSeenInSessionCookieName = 'featuredVideoSeenInSession';
const videoSeenInSession = Cookies.get(videoSeenInSessionCookieName);
const playerImpressionsInWiki = Number(Cookies.get('playerImpressionsInWiki'));
const currentSession = Cookies.get('wikia_session_id');

export function hasSeenTheVideoInCurrentSession() {
	return videoSeenInSession && currentSession && videoSeenInSession === currentSession;
}

export function setVideoSeenInSession() {
	if (!hasSeenTheVideoInCurrentSession()) {
		Cookies.set(videoSeenInSessionCookieName, currentSession);
		setPlayerImpressionsInWiki(1);
	} else {
		setPlayerImpressionsInWiki(playerImpressionsInWiki + 1);
	}
}
