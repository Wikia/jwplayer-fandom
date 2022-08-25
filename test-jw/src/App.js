import CanonicalVideoLoader from '@fandom/jwplayer-fandom/CanonicalVideoLoader'
import { WIREWAX_VIDEO, CANONICAL_VIDEO, ARTICLE_VIDEO_DETAILS } from './videoConfigs';

function App() {
  return (
    <div className="App">
		  <CanonicalVideoLoader currentVideo={CANONICAL_VIDEO} />
    </div>
  );
}

export default App;
