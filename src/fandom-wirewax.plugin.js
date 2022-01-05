// fandom-jw-plugin.js

console.log("FandomWirewaxPlugin loaded");

function injectEmbedderSDK() {
  console.log('======================================= injectEmbedderSDK START =======================================');
  if (window.createWirewaxEmbedder) {
    console.warn("Embedder SDK is already loaded");

    return;
  }

  var fandomSDKUrl =
    "https://edge-assets-wirewax.wikia-services.com/creativeData/sdk-fandom/wirewax-embedder-sdk.js";

  console.log("inject WIREWAX embedder SDK fandom build", fandomSDKUrl);

  console.log('======================================= injectEmbedderSDK END =======================================');
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

  this.player.on("playlistItem", function(){
    if (this.embedder) {

      this.stopTimeUpdate().bind(this);

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
      return response.json();
    })
    .then(function(data){
      this.vidId = data;

      // Inject SDK
      return injectEmbedderSDK();
    }.bind(this))
    .then(function(){
      this.setupEmbedder().bind(this)
    }.bind(this))
    .then(function(){
      this.registerEvents().bind(this)
    }.bind(this))
    .catch(function(error) {
      console.warn(error);
    });
  }.bind(this));
}

FandomWirewaxPlugin.prototype.setupEmbedder = function () {
  console.log('======================================= setupEmbedder START =======================================');
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

  console.log('======================================= setupEmbedder END =======================================');
  return this.embedder.ready();
}

FandomWirewaxPlugin.prototype.registerEvents = function () {
  console.log('======================================= registerEvents START =======================================');

  // Custom time sync handler
  var HTML5VideoEl = this.player.getConfig().mediaElement;
  this.setWIREWAXCurrentTime = function () {
    this.embedder.setCurrentTime(HTML5VideoEl.currentTime);
    this.animationId = window.requestAnimationFrame(
      this.setWIREWAXCurrentTime
    );
  };

  // Handle the delay caused by injecting script
  var isPlaying = this.player.getState() === "playing";
  if (isPlaying || this.autoPlay) {
    this.startTimeUpdate();
    this.embedder.play();
  }

  if (this.isPlayerRegistered) return;

  // Bind WIREWAX to JW player events
  this.player.on("play", this.JWPlayHandler.bind(this));
  this.player.on("pause", this.JWPauseHandler.bind(this));
  this.player.on("seek", this.JWSeekHandler.bind(this));

  // Bind JW to WIREWAX events
  this.embedder.on("play", this.WirewaxPlayHandler.bind(this));
  this.embedder.on("pause", this.WirewaxPauseHandler.bind(this));
  this.embedder.on("seeked", this.WirewaxSeekedHandler.bind(this));
  this.embedder.on("overlayshow", this.WirewaxOverlayShowHandler.bind(this));
  this.embedder.on("overlayhide", this.WirewaxOverlayHideHandler.bind(this));
  this.embedder.on("hotspotclick", this.WirewaxHotspotClickHandler.bind(this));

  this.isPlayerRegistered = true;
  console.log('======================================= registerEvents END =======================================');
}

FandomWirewaxPlugin.prototype.startTimeUpdate = function () {
  window.cancelAnimationFrame(this.animationId);
  this.animationId = window.requestAnimationFrame(this.setWIREWAXCurrentTime);
}

FandomWirewaxPlugin.prototype.stopTimeUpdate = function () {
  window.cancelAnimationFrame(this.animationId);
}

FandomWirewaxPlugin.prototype.JWPlayHandler = function () {
  console.log("JW -> WIREWAX: play");
  this.startTimeUpdate().bind(this);

  try {
    this.embedder.play();
  } catch (error) {
    console.warn(error);
  }
};

FandomWirewaxPlugin.prototype.JWPauseHandler = function () {
  console.log("JW -> WIREWAX: pause");
  this.stopTimeUpdate().bind(this);

  try {
    this.embedder.pause();
  } catch (error) {
    console.warn(error);
  }
};

FandomWirewaxPlugin.prototype.JWSeekHandler = function (event) {
  console.log("JW -> WIREWAX: seek");

  try {
    this.embedder.setCurrentTime(event.offset);
  } catch (error) {
    console.warn(error);
  }
};

FandomWirewaxPlugin.prototype.WirewaxPlayHandler = function () {
  console.log("WIREWAX -> JW: play");

  try {
    this.player.play();
  } catch (err) {
    console.log(err);
  }
};

FandomWirewaxPlugin.prototype.WirewaxPauseHandler = function () {
  console.log("WIREWAX -> JW: pause");

  try {
    this.player.pause();
  } catch (err) {
    console.log(err);
  }
};

FandomWirewaxPlugin.prototype.WirewaxSeekedHandler = function(seekTo) {
  console.log("WIREWAX -> JW: seek");

  try {
    this.player.seek(seekTo);
  } catch (err) {
    console.log(err);
  }
};

FandomWirewaxPlugin.prototype.WirewaxHotspotClickHandler = function (event) {
  console.log("hotspot click", event );
};

FandomWirewaxPlugin.prototype.WirewaxOverlayShowHandler = function (event) {
  console.log("overlay open", event );
};

FandomWirewaxPlugin.prototype.WirewaxOverlayHideHandler = function (event) {
  console.log("overlay close", event );
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

// export default FandomWirewaxPlugin;