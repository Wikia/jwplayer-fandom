import { CanonicalVideoPlayer } from './bundle.esm.js'
import { WIREWAX_VIDEO, CANONICAL_VIDEO, ARTICLE_VIDEO_DETAILS } from './videoConfigs';
import { TwitchEmbedPlayer } from "./bundle.esm.js";
import './App.css';

function App() {
  return (
    <div className="App">
      <TwitchEmbedPlayer
          height={"400"}
          width={"600"}
          parentDomains={['localhost', 'localhost.fandom-dev.us']}
          targetElementId={'twitchEmbedTest'}
      />
      {/* Might be useful for testing player offscreen behavior */}
      <div className='full-page-vh'/>
      <div className='full-page-vh'/>
    </div>
  );
}

export default App;
