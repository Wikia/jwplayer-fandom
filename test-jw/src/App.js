import { VideoPlayer } from './bundle.esm.js'
import { WIREWAX_VIDEO, REGULAR_VIDEO, ARTICLE_VIDEO_DETAILS } from './videoConfigs';

function App() {
  return (
    <div className="App">
		<VideoPlayer playlist={REGULAR_VIDEO ?? WIREWAX_VIDEO} />
    </div>
  );
}

export default App;
