import CanonicalVideoLoader from '@fandom/jwplayer-fandom/CanonicalVideoLoader'
import { DesktopArticleVideoLoader } from '@fandom/jwplayer-fandom/DesktopArticleVideoLoader';
import { MobileArticleVideoLoader } from '@fandom/jwplayer-fandom/MobileArticleVideoLoader';

import { unblockPlayer, unblockPlayerForStrategyRules, unblockPlayerForVastXml } from './adEngineMock';
import { WIREWAX_VIDEO, CANONICAL_VIDEO, ARTICLE_VIDEO_DETAILS } from './videoConfigs';

import './app.css';

const fandomContextTrackingMock = {
	pvUID: 'test-pv-unique-id',
	beaconId: 'test-beacon-id',
	sessionId: 'test-session-id',
	pvNumber: 666,
	pvNumberGlobal: 777,
};

window.fandomContext = {
	tracking: fandomContextTrackingMock,
};

function App() {
	const triggerAd = () => {
		unblockPlayer();
	};

	const triggerStrategyRulesAd = () => {
		unblockPlayerForStrategyRules();
	};

	const triggerVastXml = () => {
		unblockPlayerForVastXml();
	};

	return (
		<>
			<div>
				<button onClick={triggerAd}>TEST</button>
				<button onClick={triggerStrategyRulesAd}>TEST WITH STRATEGY RULES</button>
				<button onClick={triggerVastXml}>TEST WITH VAST XML</button>
			</div>
			<div className="App">
				{/*<CanonicalVideoLoader currentVideo={CANONICAL_VIDEO} />*/}
				<DesktopArticleVideoLoader videoDetails={ARTICLE_VIDEO_DETAILS} />
				{/*<MobileArticleVideoLoader videoDetails={ARTICLE_VIDEO_DETAILS} />*/}
			</div>
		</>
	);
}

export default App;
