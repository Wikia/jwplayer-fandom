import CanonicalVideoLoader from '@fandom/jwplayer-fandom/CanonicalVideoLoader'
import { DesktopArticleVideoLoader } from '@fandom/jwplayer-fandom/DesktopArticleVideoLoader';
import { MobileArticleVideoLoader } from '@fandom/jwplayer-fandom/MobileArticleVideoLoader';
import { WIREWAX_VIDEO, CANONICAL_VIDEO, ARTICLE_VIDEO_DETAILS } from './videoConfigs';
import './app.css';

function App() {
  return (
    <div className="App">
      {/*<CanonicalVideoLoader currentVideo={CANONICAL_VIDEO} />*/}
		  <DesktopArticleVideoLoader videoDetails={ARTICLE_VIDEO_DETAILS} />
    </div>
  );
}

export default App;
