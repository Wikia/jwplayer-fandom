// fandom-jw-plugin.js

console.log("FandomWirewaxPlugin loaded");

function injectEmbedderSDK() {
  if (window.createWirewaxEmbedder) {
    console.warn("Embedder SDK is already loaded");

    return;
  }

  var fandomSDKUrl =
    "https://edge-assets-wirewax.wikia-services.com/creativeData/sdk-fandom/wirewax-embedder-sdk.js";

  console.log("inject WIREWAX embedder SDK fandom build", fandomSDKUrl);

  return new Promise(function(resolve, reject) {
    var script = document.createElement("script");
    script.src = fandomSDKUrl;
    script.addEventListener("load", resolve);
    script.addEventListener("error", function(e){reject(e.error)});
    document.head.appendChild(script);
  });
};

function FandomWirewaxPlugin(rootId, options) {
  this.isPlayerRegistered = false;
  this.rootId = rootId;
  this.options = options;
  this.player = options.player;
  this.autoPlay = true;
  this.setupEmbedder = this.setupEmbedder.bind(this);
  this.registerEvents = this.registerEvents.bind(this);
  this.startTimeUpdate = this.startTimeUpdate.bind(this); 
  this.JWPlayHandler = this.JWPlayHandler.bind(this); 
  this.JWPauseHandler = this.JWPauseHandler.bind(this); 
  this.JWSeekHandler = this.JWSeekHandler.bind(this); 
  this.WirewaxPlayHandler = this.WirewaxPlayHandler.bind(this);
  this.WirewaxPauseHandler = this.WirewaxPauseHandler.bind(this); 
  this.WirewaxSeekedHandler = this.WirewaxSeekedHandler.bind(this); 
  this.WirewaxHotspotClickHandler = this.WirewaxHotspotClickHandler.bind(this);
  this.WirewaxOverlayShowHandler = this.WirewaxOverlayShowHandler.bind(this);
  this.WirewaxOverlayHideHandler = this.WirewaxOverlayHideHandler.bind(this);
  this.startTimeUpdate = this.startTimeUpdate.bind(this);
  this.stopTimeUpdate = this.stopTimeUpdate.bind(this);
  this.hotspotEvent = false;
  this.debouncePlayPause = false;

  this.player.on("playlistItem", function(){
    if (this.embedder) {

      this.stopTimeUpdate();

      // Dispose pre video interaction
      try {
        this.embedder.dispose();
      } catch (error) {
        console.log(error);
      }
    }

    // Search JW media id
    var mediaId =
      this.player.getConfig().playlistItem.mediaid ||
      this.player.getConfig().playlistItem.videoId;

    // validate interaction
    if (!mediaId) {
      throw new TypeError("No JW media id is specified.");
    }

    fetch(
      'https://edge-player.wirewax.com/jwPlayerData/' + mediaId + '.txt'
    )
    .then(function(response){
      if (response.status !== 200) {
        throw new Error("No vidId is mapped with this mediaid");
      }

      return response.json();
    })
    .then(function(data){
      this.vidId = data;

      // Inject SDK
      return injectEmbedderSDK();
    }.bind(this))
    .then(this.setupEmbedder)
    .then(this.registerEvents)
    .catch(function(error) {
      console.warn(error);
    });
  }.bind(this));
}

FandomWirewaxPlugin.prototype.setupEmbedder = function () {
  if (!this.embedder) {
    // Create a container
    this.container = document.createElement("div");
    this.container.classList.add("vjs-wirewax-container");
    this.container.setAttribute(
      "style",
      "position: absolute; height: 100%; width: 100%; top: 0; pointer-events: none"
    );
    this.player.getContainer().appendChild(this.container);

    // Initialize embedder
    this.embedder = window.createWirewaxEmbedder();
  }

  // Create video-less WIREWAX player
  this.embedder.createEl(this.container, {
    isPlugin: true,
    videoId: this.vidId,
    rootId: this.rootId,
  });

  return this.embedder.ready();
}

FandomWirewaxPlugin.prototype.registerEvents = function () {
  // Custom time sync handler
  var HTML5VideoEl = this.player.getConfig().mediaElement;
  this.setWIREWAXCurrentTime = function () {
    this.embedder.setCurrentTime(HTML5VideoEl.currentTime);
    this.animationId = window.requestAnimationFrame(
      this.setWIREWAXCurrentTime
    );
  }.bind(this);

  // Handle the delay caused by injecting script
  var isPlaying = this.player.getState() === "playing";

  if (isPlaying || this.autoPlay) {
    this.startTimeUpdate();
    this.embedder.play();
  }

  if (this.isPlayerRegistered) return;

  window.dataLayer = window.dataLayer || [];

  // Bind WIREWAX to JW player events
  this.player.on("play", this.JWPlayHandler);
  this.player.on("pause", this.JWPauseHandler);
  this.player.on("seek", this.JWSeekHandler);

  // Bind JW to WIREWAX events
  this.embedder.on("play", this.WirewaxPlayHandler);
  this.embedder.on("pause", this.WirewaxPauseHandler);
  this.embedder.on("seeked", this.WirewaxSeekedHandler);
  this.embedder.on("overlayshow", this.WirewaxOverlayShowHandler);
  this.embedder.on("overlayhide", this.WirewaxOverlayHideHandler);
  this.embedder.on("hotspotclick", this.WirewaxHotspotClickHandler);

  this.isPlayerRegistered = true;
}

FandomWirewaxPlugin.prototype.startTimeUpdate = function () {
  window.cancelAnimationFrame(this.animationId);
  this.animationId = window.requestAnimationFrame(this.setWIREWAXCurrentTime);
}

FandomWirewaxPlugin.prototype.stopTimeUpdate = function () {
  window.cancelAnimationFrame(this.animationId);
}

FandomWirewaxPlugin.prototype.JWPlayHandler = function (eventData) {
  this.startTimeUpdate();

  try {
    this.embedder.play();
    window.dataLayer.push({ event: 'wirewax-play'});
  } catch (error) {
    console.warn(error);
  }
};

FandomWirewaxPlugin.prototype.JWPauseHandler = function (eventData) {
  this.stopTimeUpdate();

  try {
    this.embedder.pause();
    window.dataLayer.push({ event: 'wirewax-pause'});
  } catch (error) {
    console.warn(error);
  }
};

FandomWirewaxPlugin.prototype.JWSeekHandler = function (event) {
  try {
    this.embedder.setCurrentTime(event.offset);
  } catch (error) {
    console.warn(error);
  }
};

FandomWirewaxPlugin.prototype.WirewaxPlayHandler = function () {
  try {
    if(this.player.getState() !== 'playing'){
      this.player.play();
    }  
  } catch (err) {
    console.log(err);
  }
};

FandomWirewaxPlugin.prototype.WirewaxPauseHandler = function () {
  try {
    if(this.player.getState() !== 'paused'){
      this.player.pause();
    }
  } catch (err) {
    console.log(err);
  }
};

FandomWirewaxPlugin.prototype.WirewaxSeekedHandler = function(seekTo) {
  try {
    if(typeof seekTo === 'number') {
      this.player.seek(seekTo);
    }
  } catch (err) {
    console.log(err);
  }
};

FandomWirewaxPlugin.prototype.WirewaxHotspotClickHandler = function (event) {
  window.dataLayer.push({ event: 'wirewax-hotspotclick'});
};

FandomWirewaxPlugin.prototype.WirewaxOverlayShowHandler = function (event) {
  window.dataLayer.push({ event: 'wirewax-overlayshow'});
};

FandomWirewaxPlugin.prototype.WirewaxOverlayHideHandler = function (event) {
  window.dataLayer.push({ event: 'wirewax-overlayhide'});
};

FandomWirewaxPlugin.prototype.startTimeUpdate = function () {
  window.cancelAnimationFrame(this.animationId);
  this.animationId = window.requestAnimationFrame(this.setWIREWAXCurrentTime);
}

FandomWirewaxPlugin.prototype.stopTimeUpdate = function () {
  window.cancelAnimationFrame(this.animationId);
}

FandomWirewaxPlugin.register = function () {
  jwplayer().registerPlugin("fandomWirewax", "8.0", FandomWirewaxPlugin);
};
