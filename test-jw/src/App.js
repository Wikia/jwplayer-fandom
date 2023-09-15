import CanonicalVideoLoader from '@fandom/jwplayer-fandom/CanonicalVideoLoader'
import { DesktopArticleVideoLoader } from '@fandom/jwplayer-fandom/DesktopArticleVideoLoader';
import { MobileArticleVideoLoader } from '@fandom/jwplayer-fandom/MobileArticleVideoLoader';

import { unblockPlayer, unblockPlayerForStrategyRules } from './adEngineMock';
import { WIREWAX_VIDEO, CANONICAL_VIDEO, ARTICLE_VIDEO_DETAILS } from './videoConfigs';

import './app.css';

function App() {
	const triggerAd = () => {
		unblockPlayer();
	};

	const triggerStrategyRulesAd = () => {
		unblockPlayerForStrategyRules();
	};

	return (
		<div className="App">
			{/*<CanonicalVideoLoader currentVideo={CANONICAL_VIDEO} />*/}
			<DesktopArticleVideoLoader videoDetails={ARTICLE_VIDEO_DETAILS} />
			{/*<MobileArticleVideoLoader videoDetails={ARTICLE_VIDEO_DETAILS} />*/}
				<button style={{ position: 'absolute', bottom: 0 }} onClick={triggerAd}>
					TEST
				</button>
				<button style={{ position: 'absolute', bottom: 0, left: 64 }} onClick={triggerStrategyRulesAd}>
					TEST WITH STRATEGY RULES
				</button>
		</div>
	);
}

export default App;
