import { CanonicalVideoPlayer } from './bundle.esm.js'
import { WIREWAX_VIDEO, CANONICAL_VIDEO, ARTICLE_VIDEO_DETAILS } from './videoConfigs';

function App() {
  return (
    <div className="App">
		  <CanonicalVideoPlayer currentVideo={CANONICAL_VIDEO ?? WIREWAX_VIDEO} />
    </div>
  );
}

export default App;
