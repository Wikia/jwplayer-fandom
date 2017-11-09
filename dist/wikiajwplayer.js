!function(e){function t(e,t){t.on("playerStart",function(){var t=document.querySelector(".jw-autostart-mute"),i=document.getElementById(e);i.classList.remove("jw-flag-autostart"),i.lastChild.removeChild(t)})}function i(e,t,i){function n(){return{wasFirstQuartileTriggered:!1,wasMidPointTriggered:!1,wasThirdQuartileTriggered:!1,progress:{durationWatched:0,percentWatched:0}}}function o(t,i){var n=Math.floor(i.position),o=Math.floor(100*n/i.duration);n>s[t].progress.durationWatched&&n%5==0&&(e.trigger(t+"SecondsPlayed",{value:n}),s[t].progress.durationWatched=n),o>=25&&!s[t].wasFirstQuartileTriggered&&(e.trigger(t+"FirstQuartile"),s[t].wasFirstQuartileTriggered=!0),o>=50&&!s[t].wasMidPointTriggered&&(e.trigger(t+"MidPoint"),s[t].wasMidPointTriggered=!0),o>=75&&!s[t].wasThirdQuartileTriggered&&(e.trigger(t+"ThirdQuartile"),s[t].wasThirdQuartileTriggered=!0),o>s[t].progress.percentWatched&&o%10==0&&(e.trigger(t+"PercentPlayed",{value:o}),s[t].progress.percentWatched=o)}var s={ad:n(),video:n()},a=!1,l=0,r={ad:"ad",video:"video"},c=!1;i.info("before ready"),e.once("ready",function(){i.info("player ready");var t=e.getPlugin("related");t.on("open",function(){i.info("related plugin open"),e.trigger("relatedVideoImpression"),s[r.video]=n()}),t.on("play",function(t){i.info("related plugin play"),l++,e.trigger("relatedVideoPlay",{auto:t.auto,item:t.item,position:t.position,depth:l})})}),e.on("play",function(t){c&&(e.trigger("videoResumed"),i.info("videoResumed triggered")),c=!1}),e.on("pause",function(){c=!0}),e.on("firstFrame",function(){0===l&&(e.trigger("playerStart",{auto:t}),i.info("playerStart triggered")),e.trigger("videoStart"),i.info("videoStart triggered")}),e.on("mute",function(){e.getMute()||a||(e.trigger("firstUnmute"),a=!0)}),e.on("time",function(e){o(r.video,e)}),e.on("adTime",function(e){o(r.ad,e)}),e.on("adRequest",function(){s[r.ad]=n()})}function n(e){function t(e,t){var i=new XMLHttpRequest,s={name:o+" "+e};t&&(s.description="string"==typeof t?t:JSON.stringify(t)),r&&(s.client=r),i.open("POST",n,!0),i.setRequestHeader("Content-type","application/json"),i.send(JSON.stringify(s))}function i(e,i){l<=s.error&&(console.error(o,e,i),t(e,i))}var n="https://"+(e.servicesDomain||"services.wikia.com")+"/event-logger/error",o="JWPlayer",s={info:1,warn:2,error:3,off:4},a=e.logger||{},l=a.logLevel?s[a.logLevel]:s.error,r=a.clientName;return{info:function(e,t){l<=s.info&&console.info(o,e,t)},warn:function(e,t){l<=s.warn&&console.warn(o,e,t)},error:i,subscribeToPlayerErrors:function(e){e.on("setupError",function(e){i("setupError",e)}),e.on("error",function(e){i("error",e)})}}}function o(e){function t(e,t){if(e){var i=n.parseFromString(t,"image/svg+xml").documentElement;i.setAttribute("class",e.getAttribute("class")),e.parentNode.replaceChild(i,e)}}function i(e){var i=e.querySelector(".jw-controlbar"),n=e.querySelector(".jw-display");[{selector:".jw-svg-icon-play",iconName:"play"},{selector:".jw-svg-icon-pause",iconName:"pause"},{selector:".jw-svg-icon-fullscreen-on",iconName:"fullScreenOn"},{selector:".jw-svg-icon-fullscreen-off",iconName:"fullScreenOff"},{selector:".jw-svg-icon-settings",iconName:"settings"},{selector:".jw-svg-icon-volume-0",iconName:"volumeOff"},{selector:".jw-svg-icon-volume-50",iconName:"volumeOn"},{selector:".jw-svg-icon-volume-100",iconName:"volumeOn"}].forEach(function(e){t(i.querySelector(e.selector),c[e.iconName])}),[{selector:".jw-svg-icon-play",iconName:"play"},{selector:".jw-svg-icon-pause",iconName:"pause"}].forEach(function(e){t(n.querySelector(e.selector),c[e.iconName])})}var n=new DOMParser;e.on("ready",function(){i(e.getContainer())})}function s(e,t,i){this.player=e,this.container=i,this.wikiaSettingsElement=document.createElement("div"),this.buttonID="wikiaSettings",this.config=t,this.documentClickHandler=this.documentClickHandler.bind(this),this.container.classList.add("wikia-jw-settings__plugin"),this.wikiaSettingsElement.classList.add("wikia-jw-settings"),this.addSettingsContent(this.wikiaSettingsElement),this.container.appendChild(this.wikiaSettingsElement),this.player.on("levels",this.onQualityLevelsChange.bind(this)),document.addEventListener("click",this.documentClickHandler),document.addEventListener("touchend",this.documentClickHandler)}function a(e){e.on("relatedVideoPlay",function(t){t.auto||e.setMute(!1)})}function l(e,t){function i(t){return!document.hidden&&t&&(-1===["playing","paused","complete"].indexOf(e.getState())||n)}var n=!1;document.addEventListener("visibilitychange",function(){i(t)&&(e.play(!0),n=!1)},!1),e.on("relatedVideoPlay",function(){document.hidden&&(e.pause(),n=!0)})}function r(e,t,i){function n(e){i.setCustomDimension(34,e.mediaid),i.setCustomDimension(35,e.title),i.setCustomDimension(36,e.tags)}function o(){if(i.comscore){var e=document.getElementById("comscoreVideoMetrixTrack");e&&e.parentElement.removeChild(e);var t=document.createElement("img");t.src="http://b.scorecardresearch.com/p?C1=1&C2=6177433&C5=04",t.id="comscoreVideoMetrixTrack",document.body.appendChild(t)}}function s(t){if(!t.label)throw new Error("No tracking label provided");var n={action:t.action||"click",category:l,label:t.label,value:Number(e.getMute()),eventName:a,videoId:e.getPlaylistItem().mediaid,player:"jwplayer",trackingMethod:"analytics"};i.track(n)}var a="videoplayerevent",l=i.category||"featured-video";i.setCustomDimension(37,t?"Yes":"No"),e.once("ready",function(){n(e.getPlaylistItem()),s({label:"load",action:"impression"})}),e.on("relatedVideoImpression",function(){s({label:"recommended-video",action:"impression"})}),e.on("relatedVideoPlay",function(e){n(e.item),s({label:(e.auto?"recommended-video-autoplay-":"recommended-video-select-")+e.position,action:"impression"}),s({label:"recommended-video-depth-"+e.depth,action:"impression"}),o()}),e.on("videoResumed",function(){s({label:"play-resumed"})}),e.on("playerStart",function(e){s(e.auto?{label:"autoplay-start",action:"impression"}:{label:"user-start"}),o()}),e.on("pause",function(){s({label:"paused"})}),e.on("firstUnmute",function(){s({label:"unmuted"})}),e.on("videoSecondsPlayed",function(e){s({label:"played-seconds-"+e.value,action:"view"})}),e.on("videoPercentPlayed",function(e){s({label:"played-percentage-"+e.value,action:"view"})}),e.on("complete",function(){s({label:"completed",action:"impression"})}),e.on("onScrollClosed",function(){s({label:"collapsed",action:"close"})}),e.on("videoFeedbackImpression",function(){s({label:"feedback",action:"impression"})}),e.on("videoFeedbackThumbUp",function(){s({label:"feedback-thumb-up",action:"click"})}),e.on("videoFeedbackThumbDown",function(){s({label:"feedback-thumb-down",action:"click"})}),e.on("videoFeedbackClosed",function(){s({label:"feedback",action:"close"})}),e.on("autoplayToggle",function(e){s({label:"autoplay-"+(e.enabled?"enabled":"disabled")})})}var c={play:'<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M14.767 9.437L3.858 16.903a.553.553 0 0 1-.565.037.531.531 0 0 1-.293-.473V1.533c0-.199.113-.381.293-.473a.557.557 0 0 1 .565.036l10.91 7.467A.53.53 0 0 1 15 9a.53.53 0 0 1-.233.437z" fill-rule="evenodd"/></svg>',pause:'<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd"><rect width="5" height="16" rx="1" x="2" y="1"/><rect x="11" width="5" height="16" rx="1" y="1"/></g></svg>',fullScreenOn:'<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M3.249 7H1V2h5v2.25H3.249zm11.502 0H17V2h-5v2.25h2.751zM3.249 11H1v5h5v-2.25H3.249zm11.502 0H17v5h-5v-2.25h2.751z" fill-rule="evenodd"/></svg>',fullScreenOff:'<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M3.751 2H6v5H1V4.75h2.751zm10.498 0H12v5h5V4.75h-2.751zM3.751 16H6v-5H1v2.25h2.751zm10.498 0H12v-5h5v2.25h-2.751z" fill-rule="evenodd"/></svg>',settings:'<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M9 7.09a1.909 1.909 0 1 1 0 3.819A1.909 1.909 0 0 1 9 7.09m-4.702-.03a1.07 1.07 0 0 1-.99.667h-.672A.637.637 0 0 0 2 8.364v1.272c0 .352.285.637.636.637h.672c.436 0 .824.264.99.667l.006.013c.167.403.08.864-.229 1.172L3.6 12.6a.636.636 0 0 0 0 .9l.9.9a.636.636 0 0 0 .9 0l.475-.475a1.072 1.072 0 0 1 1.185-.223c.403.166.667.554.667.99v.672c0 .35.285.636.637.636h1.272a.637.637 0 0 0 .637-.636v-.672c0-.436.264-.824.667-.99l.013-.006a1.07 1.07 0 0 1 1.172.229l.475.475a.636.636 0 0 0 .9 0l.9-.9a.636.636 0 0 0 0-.9l-.475-.475a1.072 1.072 0 0 1-.229-1.172l.006-.013a1.07 1.07 0 0 1 .99-.667h.672A.637.637 0 0 0 16 9.636V8.364a.637.637 0 0 0-.636-.637h-.672a1.07 1.07 0 0 1-.996-.68 1.072 1.072 0 0 1 .229-1.172L14.4 5.4a.636.636 0 0 0 0-.9l-.9-.9a.636.636 0 0 0-.9 0l-.475.475c-.308.308-.77.396-1.172.229l-.013-.006a1.07 1.07 0 0 1-.667-.99v-.672A.637.637 0 0 0 9.636 2H8.364a.637.637 0 0 0-.637.636v.672a1.07 1.07 0 0 1-.68.996 1.07 1.07 0 0 1-1.172-.229L5.4 3.6a.636.636 0 0 0-.9 0l-.9.9a.636.636 0 0 0 0 .9l.475.475a1.072 1.072 0 0 1 .223 1.185" fill-rule="evenodd"/></svg>',volumeOff:'<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M8.45 2.17L4.664 6.28H1.036C.256 6.28 0 6.739 0 7.175v3.522c0 .436.256.985 1.036.985h3.646l3.785 4.176a1.1 1.1 0 0 0 .533.143.964.964 0 0 0 .5-.137c.33-.185.5-.526.5-.897V3.013c0-.37-.17-.713-.5-.898-.33-.186-.72-.13-1.05.054zm7.192 7.33l2.121-2.122a.807.807 0 1 0-1.142-1.141l-2.122 2.12-2.12-2.12a.808.808 0 0 0-1.142 1.141L13.358 9.5l-2.121 2.121a.807.807 0 1 0 1.142 1.142l2.12-2.12 2.122 2.12a.805.805 0 0 0 1.142 0 .807.807 0 0 0 0-1.142L15.642 9.5z" fill-rule="evenodd"/></svg>',volumeOn:'<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd"><path d="M8.45 2.17L4.664 6.28H1.036C.256 6.28 0 6.739 0 7.175v3.522c0 .436.256.985 1.036.985h3.646l3.785 4.176a1.1 1.1 0 0 0 .533.143.964.964 0 0 0 .5-.137c.33-.185.5-.526.5-.897V3.013c0-.37-.17-.713-.5-.898-.33-.186-.72-.13-1.05.054zm4.95 10.156a4.393 4.393 0 0 0 0-6.19.708.708 0 0 0-1.004 1 2.978 2.978 0 0 1 0 4.192.707.707 0 1 0 1.003.998z"/><path d="M17.515 9.231A6.186 6.186 0 0 0 15.7 4.84a.707.707 0 1 0-1.003.998A4.777 4.777 0 0 1 16.1 9.231a4.778 4.778 0 0 1-1.4 3.394.708.708 0 1 0 1.002.999 6.186 6.186 0 0 0 1.814-4.393z"/></g></svg>',back:'<svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M6.003 10.002a.997.997 0 0 1-.707-.293L.293 4.707a.999.999 0 1 1 1.414-1.414l4.296 4.295 4.293-4.293A.999.999 0 1 1 11.71 4.71l-5 5a.997.997 0 0 1-.707.293" fill-rule="evenodd"/></svg>',quality:'<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-quality-100" viewBox="0 0 240 240"><path d="M55,200H35c-3,0-5-2-5-4c0,0,0,0,0-1v-30c0-3,2-5,4-5c0,0,0,0,1,0h20c3,0,5,2,5,4c0,0,0,0,0,1v30C60,198,58,200,55,200L55,200z M110,195v-70c0-3-2-5-4-5c0,0,0,0-1,0H85c-3,0-5,2-5,4c0,0,0,0,0,1v70c0,3,2,5,4,5c0,0,0,0,1,0h20C108,200,110,198,110,195L110,195z M160,195V85c0-3-2-5-4-5c0,0,0,0-1,0h-20c-3,0-5,2-5,4c0,0,0,0,0,1v110c0,3,2,5,4,5c0,0,0,0,1,0h20C158,200,160,198,160,195L160,195z M210,195V45c0-3-2-5-4-5c0,0,0,0-1,0h-20c-3,0-5,2-5,4c0,0,0,0,0,1v150c0,3,2,5,4,5c0,0,0,0,1,0h20C208,200,210,198,210,195L210,195z"></path></svg>'},d=[];window.wikiaJWPlayer=function(e,c,u){function g(e,t){var i=document.createElement("script"),n=document.getElementById(e);i.onload=function(){s.register(),d.forEach(function(e){e()})},i.async=!0,i.src=t||"https://content.jwplatform.com/libraries/VXc5h4Tf.js",n.parentNode.insertBefore(i,n.nextSibling)}function h(e,t,i){var n=jwplayer(e),o=t.videoDetails.playlist[0].mediaid,s=t.autoplay,a={advertising:{autoplayadsmuted:s,client:"googima",vpaidcontrols:!0},autostart:s&&!document.hidden,description:t.videoDetails.description,image:"//content.jwplatform.com/thumbs/"+o+"-640.jpg",mute:t.mute,playlist:t.videoDetails.playlist,title:t.videoDetails.title};return t.settings&&(a.plugins={wikiaSettings:{showAutoplayToggle:t.settings.showAutoplayToggle,showQuality:t.settings.showQuality,autoplay:t.autoplay}}),t.related&&(a.related={autoplaytimer:t.related.time||3,file:"//cdn.jwplayer.com/v2/playlists/"+t.related.playlistId+"?related_media_id="+o,oncomplete:t.related.autoplay?"autoplay":"show"}),i.info("setupPlayer"),n.setup(a),i.info("after setup"),i.subscribeToPlayerErrors(n),n}!function(e,t,i){"undefined"!=typeof jwplayer?i():(d.push(i),1===d.length&&g(e,t))}(e,c.playerURL,function(){var s=n(c),d=h(e,c,s);o(d),i(d,c.autoplay,s),c.related&&a(d),c.tracking&&r(d,c.autoplay,c.tracking),l(d,c.autoplay),t(e,d),u&&u(d)})};var u=new DOMParser;s.prototype.isSettingsMenuOrSettingsButton=function(e){var t=this.player.getContainer().querySelector("[button="+this.buttonID+"]");return t===e||t.contains(e)||this.wikiaSettingsElement===e||this.wikiaSettingsElement.contains(e)},s.prototype.documentClickHandler=function(e){!this.isSettingsMenuOrSettingsButton(e.target)&&this.container.style.display&&this.close()},s.prototype.addButton=function(){var e=this.createSVG(c.settings);e.classList.add("jw-svg-icon"),e.classList.add("jw-svg-icon-wikia-settings"),this.player.addButton(e.outerHTML,"Settings",function(){this.wikiaSettingsElement.style.display?this.close():this.open()}.bind(this),this.buttonID,"wikia-jw-settings-button")},s.prototype.removeButton=function(){this.player.removeButton(this.buttonID)},s.prototype.close=function(){this.showSettingsList(),this.container.style.display=null,this.player.getContainer().classList.remove("wikia-jw-settings-open")},s.prototype.open=function(){this.container.style.display="block",this.player.getContainer().classList.add("wikia-jw-settings-open")},s.prototype.hide=function(){this.close(),this.removeButton()},s.prototype.show=function(){this.player.getContainer().querySelector("[button="+this.buttonID+"]")||this.addButton()},s.prototype.showQualityLevelsList=function(){this.settingsList.style.display="none",this.qualityLevelsList&&(this.qualityLevelsList.style.display="block")},s.prototype.showSettingsList=function(){this.settingsList.style.display="block",this.qualityLevelsList&&(this.qualityLevelsList.style.display="none")},s.prototype.addSettingsContent=function(e){return e.classList.add("wikia-jw-settings"),e.classList.remove("jw-reset"),e.classList.remove("jw-plugin"),this.settingsList=this.createSettingsListElement(),e.appendChild(this.settingsList),this.config.showQuality&&(this.createQualityLevelsList(),e.appendChild(this.qualityLevelsList)),e},s.prototype.createSettingsListElement=function(){var e=document.createElement("ul");return e.classList.add("wikia-jw-settings__list"),e.classList.add("wds-list"),this.config.showQuality&&e.appendChild(this.createQualityButton()),this.config.showAutoplayToggle&&e.appendChild(this.createAutoplayToggle()),e},s.prototype.createSVG=function(e){return u.parseFromString(e,"image/svg+xml").documentElement},s.prototype.createQualityButton=function(){var e=document.createElement("li");e.classList.add("wikia-jw-settings__quality-button");var t=this.createSVG(c.back);return t.classList.add("wikia-jw-settings__right-arrow-icon"),e.innerHTML="Video Quality"+t.outerHTML,e.addEventListener("click",this.showQualityLevelsList.bind(this)),e},s.prototype.createAutoplayToggle=function(){var e=document.createElement("li"),t=document.createElement("input"),i=document.createElement("label"),n=this.player,o=n.getContainer().id+"-videoAutoplayToggle";return e.classList.add("wikia-jw-settings__autoplay-toggle"),t.setAttribute("type","checkbox"),t.setAttribute("id",o),t.classList.add("wds-toggle__input"),this.config.autoplay&&t.setAttribute("checked",""),i.setAttribute("for",o),i.classList.add("wds-toggle__label"),i.appendChild(document.createTextNode("Autoplay Videos")),i.addEventListener("click",function(e){n.trigger("autoplayToggle",{enabled:!e.target.previousSibling.checked})}),e.appendChild(t),e.appendChild(i),e},s.prototype.createQualityLevelsList=function(){var e=this.player,t=this.createSVG(c.back);t.classList.add("wikia-jw-settings__back-icon"),this.backButton=document.createElement("li"),this.qualityLevelsList=document.createElement("ul"),this.qualityLevelsList.classList.add("wikia-jw-settings__quality-levels"),this.qualityLevelsList.classList.add("wds-list"),this.backButton.classList.add("wikia-jw-settings__back"),this.backButton.innerHTML=t.outerHTML+" Back",this.backButton.addEventListener("click",this.showSettingsList.bind(this)),this.qualityLevelsList.appendChild(this.backButton),e.on("levelsChanged",this.updateCurrentQuality.bind(this))},s.prototype.onQualityLevelsChange=function(e){var t=!e.levels.length||1===e.levels.length&&"0"===e.levels[0].label,i=!t&&this.config.showQuality||this.config.showAutoplayToggle;t?this.wikiaSettingsElement.classList.add("is-quality-list-empty"):this.wikiaSettingsElement.classList.remove("is-quality-list-empty"),i?this.show():this.hide(),this.qualityLevelsList&&this.updateQualityLevelsList(e.levels)},s.prototype.updateQualityLevelsList=function(e){for(var t=this.player;this.qualityLevelsList.childElementCount>1;)this.qualityLevelsList.removeChild(this.qualityLevelsList.firstChild);e.forEach(function(e,i){var n=document.createElement("li");n.addEventListener("click",function(){t.setCurrentQuality(i),this.close()}.bind(this)),t.getCurrentQuality()===i&&n.classList.add("is-active"),n.appendChild(document.createTextNode(e.label)),this.qualityLevelsList.insertBefore(n,this.backButton)},this)},s.prototype.updateCurrentQuality=function(e){for(var t=0;t<this.qualityLevelsList.childNodes.length;t++){var i=this.qualityLevelsList.childNodes[t];e.currentQuality===t?i.classList.add("is-active"):i.classList.remove("is-active")}},s.register=function(){jwplayer().registerPlugin("wikiaSettings","8.0.0",s)}}("undefined"==typeof wikiaJWPlayer?wikiaJWPlayer={}:wikiaJWPlayer);