import { VideoPlayer } from './bundle.esm.js'


const WIREWAX_VIDEO = 'https://cdn.jwplayer.com/v2/media/dWVV3F7S';
const REGULAR_VIDEO = 'https://cdn.jwplayer.com/v2/media/r46kS55a'

function App() {
  return (
    <div className="App">
		<VideoPlayer playlist={REGULAR_VIDEO ?? WIREWAX_VIDEO} />
    </div>
  );
}

export default App;
