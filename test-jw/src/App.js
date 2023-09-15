import CanonicalVideoLoader from '@fandom/jwplayer-fandom/CanonicalVideoLoader'
import { DesktopArticleVideoLoader } from '@fandom/jwplayer-fandom/DesktopArticleVideoLoader';
import { MobileArticleVideoLoader } from '@fandom/jwplayer-fandom/MobileArticleVideoLoader';
import { WIREWAX_VIDEO, CANONICAL_VIDEO, ARTICLE_VIDEO_DETAILS } from './videoConfigs';
import { communicationService } from './communication/communicationService';
import './app.css';

function App() {
	const triggerAd = () => {
		communicationService.dispatch({
			type: '[AdEngine OptIn] set opt in',
		});
		communicationService.dispatch({
			type: '[Ad Engine] Configured',
			showAds: true,
			autoplayDisabled: false,
		});
		communicationService.dispatch({
			type: '[Ad Engine] Setup JWPlayer',
			showAds: true,
			autoplayDisabled: false,
		});
	};

	const triggerStrategyRulesAd = () => {
		communicationService.dispatch({
			type: '[AdEngine OptIn] set opt in',
		});
		communicationService.dispatch({
			type: '[Ad Engine] Configured',
			showAds: true,
			autoplayDisabled: false,
		});
		communicationService.dispatch({
			type: '[Ad Engine] Setup JWPlayer',
			showAds: true,
			autoplayDisabled: false,
			strategyRulesEnabled: true,
			vastUrl: 'https://pubads.g.doubleclick.net/gampad/ads?iu=%2F5441%2Fwka1b.VIDEO%2Ffeatured%2Fdesktop%2Fucp_desktop-fandom-fv-article%2F_project43-life&sz=640x480&gdfp_req=1&output=xml_vast4&unviewed_position_start=1&env=vp&cust_params=src%3Dtest%26pos%3Dfeatured%26post_id%3D-1',
		});
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
