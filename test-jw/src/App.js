import { DesktopArticleVideoLoader } from './bundle.esm.js'
import { WIREWAX_VIDEO, CANONICAL_VIDEO, ARTICLE_VIDEO_DETAILS } from './videoConfigs';

function App() {
  return (
    <div className="App">
		  <DesktopArticleVideoLoader videoDetails={ARTICLE_VIDEO_DETAILS} />
    </div>
  );
}

export default App;
