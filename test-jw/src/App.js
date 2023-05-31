import CanonicalVideoLoader from '@fandom/jwplayer-fandom/CanonicalVideoLoader'
import { DesktopArticleVideoLoader } from '@fandom/jwplayer-fandom/DesktopArticleVideoLoader';
import { MobileArticleVideoLoader } from '@fandom/jwplayer-fandom/MobileArticleVideoLoader';
import { WIREWAX_VIDEO, CANONICAL_VIDEO, ARTICLE_VIDEO_DETAILS } from './videoConfigs';
import './app.css';

function App() {
  const triggerAd = () => {
    window.jwplayer().playAd('https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=');
  };

  return (
    <div className="App">
      {/*<CanonicalVideoLoader currentVideo={CANONICAL_VIDEO} />*/}
		  <MobileArticleVideoLoader videoDetails={ARTICLE_VIDEO_DETAILS} />
      <button style={{ position: 'absolute', bottom: 0 }} onClick={triggerAd}>
				TEST
			</button>

	</div>
  );
}

export default App;
