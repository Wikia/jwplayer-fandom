import { JWPlayerApi, Player } from 'src/types';
import FandomWirewaxPlugin from 'src/plugins/fandom-wirewax.plugin';

interface WindowJWPlayer extends Window {
	jwplayer?: JWPlayerApi;
}

declare let window: WindowJWPlayer;

/**
 * gets the android player if user is on an android device browser
 */
    function getDefaultPlayerUrl(){
    return !!navigator.userAgent.match(/android/i) ? 'https://cdn.jwplayer.com/libraries/MFqndUHM.js' : 'https://content.jwplatform.com/libraries/VXc5h4Tf.js';
}

class JWPlayer {
    player: Player;

    // constructor(elementId, playerURL = null) {
    //     var script = document.createElement('script');
    //     script.src = playerURL || getDefaultPlayerUrl();
    //     script.onload = () => {	
    //         this.player = window.jwplayer(elementId);
    //     }
    //     document.getElementsByTagName('head')[0].appendChild(script);
    // }

    async init(elementId, playerURL = null) {
        var script = document.createElement('script');
        script.src = playerURL || getDefaultPlayerUrl();
        script.onload = () => {	
            this.player = window.jwplayer(elementId);
        }
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    
    setup(elementId) {
        const registerPlugin = window.jwplayer().registerPlugin;
        registerPlugin("wirewax", "8.0", FandomWirewaxPlugin);

        this.player.setup({
            playlist: 'https://cdn.jwplayer.com/v2/media/dWVV3F7S',
            plugins: { fandomWirewax: {}},
        }).on('ready', (event) => {
            new FandomWirewaxPlugin(elementId, {
                player: window.jwplayer(elementId),
                ready: event,
            });
        });
    }    
}

export default JWPlayer;