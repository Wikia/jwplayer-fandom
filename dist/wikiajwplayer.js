!function(e){function t(e){var t=document.createElement("li"),i=document.createElement("input"),n=document.createElement("label");return t.className="wikia-jw-settings__toggle",i.className="wds-toggle__input",i.id=e.id,i.type="checkbox",i.checked=e.checked,n.className="wds-toggle__label",n.setAttribute("for",e.id),n.appendChild(document.createTextNode(e.label)),t.appendChild(i),t.appendChild(n),t}function i(e){var t=a(y.back);return"left"===e?t.classList.add("wikia-jw-settings__back-icon"):t.classList.add("wikia-jw-settings__right-arrow-icon"),t}function n(e){if(e)for(;e.childElementCount>1;)e.removeChild(e.firstChild)}function a(e){return f.parseFromString(e,"image/svg+xml").documentElement}function s(e){e&&(e.style.display="block")}function o(e){e&&(e.style.display="none")}function l(e){e.on("playerStart",function(){var t=document.querySelector(".jw-autostart-mute");t&&(e.getContainer().classList.remove("jw-flag-autostart"),t.style.display="none")})}function r(e,t,i){function n(){return{wasFirstQuartileTriggered:!1,wasMidPointTriggered:!1,wasThirdQuartileTriggered:!1,progress:{durationWatched:0,percentWatched:0}}}function a(t,i){var n=Math.floor(i.position),a=Math.floor(100*n/i.duration);n>s[t].progress.durationWatched&&n%5==0&&(e.trigger(t+"SecondsPlayed",{value:n}),s[t].progress.durationWatched=n),a>=25&&!s[t].wasFirstQuartileTriggered&&(e.trigger(t+"FirstQuartile"),s[t].wasFirstQuartileTriggered=!0),a>=50&&!s[t].wasMidPointTriggered&&(e.trigger(t+"MidPoint"),s[t].wasMidPointTriggered=!0),a>=75&&!s[t].wasThirdQuartileTriggered&&(e.trigger(t+"ThirdQuartile"),s[t].wasThirdQuartileTriggered=!0),a>s[t].progress.percentWatched&&a%10==0&&(e.trigger(t+"PercentPlayed",{value:a}),s[t].progress.percentWatched=a)}var s={ad:n(),video:n()},o=!1,l=0,r={ad:"ad",video:"video"},c=!1;i.info("before ready"),e.once("ready",function(){i.info("player ready");var t=e.getPlugin("related");t.on("open",function(){i.info("related plugin open"),e.trigger("relatedVideoImpression"),s[r.video]=n()}),t.on("play",function(t){i.info("related plugin play"),l++,e.trigger("relatedVideoPlay",{auto:t.auto,item:t.item,position:t.position,depth:l})})}),e.on("play",function(t){c&&(e.trigger("videoResumed"),i.info("videoResumed triggered")),c=!1}),e.on("pause",function(){c=!0}),e.on("firstFrame",function(){0===l&&(e.trigger("playerStart",{auto:t}),i.info("playerStart triggered")),e.trigger("videoStart"),i.info("videoStart triggered")}),e.on("mute",function(){e.getMute()||o||(e.trigger("firstUnmute"),o=!0)}),e.on("time",function(e){a(r.video,e)}),e.on("adTime",function(e){a(r.ad,e)}),e.on("adRequest",function(){s[r.ad]=n()})}function c(e){function t(e,t){var i=new XMLHttpRequest,s={name:a+" "+e};t&&(s.description="string"==typeof t?t:JSON.stringify(t)),r&&(s.client=r),i.open("POST",n,!0),i.setRequestHeader("Content-type","application/json"),i.send(JSON.stringify(s))}function i(e,i){l<=s.error&&(console.error(a,e,i),t(e,i))}var n="https://"+(e.servicesDomain||"services.wikia.com")+"/event-logger/error",a="JWPlayer",s={info:1,warn:2,error:3,off:4},o=e.logger||{},l=o.logLevel?s[o.logLevel]:s.error,r=o.clientName;return{info:function(e,t){l<=s.info&&console.info(a,e,t)},warn:function(e,t){l<=s.warn&&console.warn(a,e,t)},error:i,subscribeToPlayerErrors:function(e){e.on("setupError",function(e){i("setupError",e)}),e.on("error",function(e){i("error",e)})}}}function u(e){function t(e,t){if(e){var i=n.parseFromString(t,"image/svg+xml").documentElement;i.setAttribute("class",e.getAttribute("class")),e.parentNode.replaceChild(i,e)}}function i(e){var i=e.querySelector(".jw-controlbar"),n=e.querySelector(".jw-display");[{selector:".jw-svg-icon-play",iconName:"play"},{selector:".jw-svg-icon-pause",iconName:"pause"},{selector:".jw-svg-icon-fullscreen-on",iconName:"fullScreenOn"},{selector:".jw-svg-icon-fullscreen-off",iconName:"fullScreenOff"},{selector:".jw-svg-icon-settings",iconName:"settings"},{selector:".jw-svg-icon-volume-0",iconName:"volumeOff"},{selector:".jw-svg-icon-volume-50",iconName:"volumeOn"},{selector:".jw-svg-icon-volume-100",iconName:"volumeOn"}].forEach(function(e){t(i.querySelector(e.selector),y[e.iconName])}),[{selector:".jw-svg-icon-play",iconName:"play"},{selector:".jw-svg-icon-pause",iconName:"pause"}].forEach(function(e){t(n.querySelector(e.selector),y[e.iconName])})}var n=new DOMParser;e.on("ready",function(){i(e.getContainer())})}function d(e,t,i){this.player=e,this.container=i,this.wikiaSettingsElement=document.createElement("div"),this.buttonID="wikiaSettings",this.config=t,this.documentClickHandler=this.documentClickHandler.bind(this),this.container.classList.add("wikia-jw-settings__plugin"),this.wikiaSettingsElement.classList.add("wikia-jw-settings"),this.addSettingsContent(this.wikiaSettingsElement),this.container.appendChild(this.wikiaSettingsElement),this.player.on("levels",this.onQualityLevelsChange.bind(this)),this.player.on("captionsList",this.onCaptionsChange.bind(this)),document.addEventListener("click",this.documentClickHandler),document.addEventListener("touchend",this.documentClickHandler)}function p(e){e.on("relatedVideoPlay",function(t){t.auto||e.setMute(!1)})}function g(e,t){function i(t){return!document.hidden&&t&&(-1===["playing","paused","complete"].indexOf(e.getState())||n)}var n=!1;document.addEventListener("visibilitychange",function(){i(t)&&(e.play(!0),n=!1)},!1),e.on("relatedVideoPlay",function(){document.hidden&&(e.pause(),n=!0)})}function h(e,t,i){function n(e){"function"==typeof i.setCustomDimension&&(i.setCustomDimension(34,e.mediaid),i.setCustomDimension(35,e.title),i.setCustomDimension(36,e.tags))}function a(e,t){var i=document.getElementById(e);i&&i.parentElement.removeChild(i);var n=document.createElement("img");n.src=t,n.id=e,document.body.appendChild(n)}function s(){if(i.comscore){a("comscoreVideoMetrixTrack","http://b.scorecardresearch.com/p?C1=1&C2=6177433&C5=04")}}function o(e){e&&a("wikiaJWPlayerCustomPixel",e)}function l(t){if(!t.label)throw new Error("No tracking label provided");var n={action:t.action||"click",category:c,label:t.label,value:Number(e.getMute()),eventName:r,videoId:e.getPlaylistItem().mediaid,player:"jwplayer",trackingMethod:"analytics"};i.track(n)}var r="videoplayerevent",c=i.category||"featured-video";"function"==typeof i.setCustomDimension&&i.setCustomDimension(37,t?"Yes":"No"),e.once("ready",function(){n(e.getPlaylistItem()),l({label:"load",action:"impression"})}),e.on("relatedVideoImpression",function(){l({label:"recommended-video",action:"impression"})}),e.on("relatedVideoPlay",function(e){n(e.item),l({label:(e.auto?"recommended-video-autoplay-":"recommended-video-select-")+e.position,action:"impression"}),l({label:"recommended-video-depth-"+e.depth,action:"impression"}),s(),o(e.item.pixel)}),e.on("videoResumed",function(){l({label:"play-resumed"})}),e.on("playerStart",function(e){l(e.auto?{label:"autoplay-start",action:"impression"}:{label:"user-start"}),s(),o(i.pixel)}),e.on("pause",function(){l({label:"paused"})}),e.on("firstUnmute",function(){l({label:"unmuted"})}),e.on("videoPercentPlayed",function(e){l({label:"played-percentage-"+e.value,action:"view"})}),e.on("complete",function(){l({label:"completed",action:"impression"})}),e.on("onScrollClosed",function(){l({label:"collapsed",action:"close"})}),e.on("videoFeedbackImpression",function(){l({label:"feedback",action:"impression"})}),e.on("videoFeedbackThumbUp",function(){l({label:"feedback-thumb-up",action:"click"})}),e.on("videoFeedbackThumbDown",function(){l({label:"feedback-thumb-down",action:"click"})}),e.on("videoFeedbackClosed",function(){l({label:"feedback",action:"close"})}),e.on("autoplayToggle",function(e){l({label:"autoplay-"+(e.enabled?"enabled":"disabled")})}),e.on("captionsSelected",function(e){l({label:"language-selected-"+e.selectedLang.toLowerCase()})})}var m={de:{admessage:"Die Werbung endet in xx Sekunden",autoplayVideos:"Automatische Wiedergabe",back:"Zurück",captions:"Untertitel",close:"Schließen",cuetext:"Werbung",fullscreen:"Vollbild",next:"Nächstes",nextUp:"Als nächstes",nextUpInSeconds:"Als nächstes in xx Sekunden",pause:"Pause",play:"Abspielen",playback:"Wiedergabe starten",player:"Video-Player",prev:"Vorheriges",replay:"Erneut abspielen",settings:"Einstellungen",skipmessage:"Werbung überspringen in xx Sekunden",skiptext:"Überspringen",videoQuality:"Video-Qualität",volume:"Lautstärke"},en:{admessage:"The ad will end in xx seconds",autoplayVideos:"Autoplay Videos",back:"Back",captions:"Captions",close:"Close",cuetext:"Advertisement",fullscreen:"Fullscreen",next:"Next",nextUp:"Next Up",nextUpInSeconds:"Next up in xx",pause:"Pause",play:"Play",playback:"Start playback",player:"Video Player",prev:"Previous",replay:"Replay",settings:"Settings",skipmessage:"Skip ad in xx",skiptext:"Skip",videoQuality:"Video Quality",volume:"Volume"},es:{admessage:"El anuncio termina en xx segundos",autoplayVideos:"Videos autoreproducidos",back:"Atrás",captions:"Subtítulos",close:"Cerrar",cuetext:"Anuncio",fullscreen:"Pantalla completa",next:"Siguiente",nextUp:"Siguiente",nextUpInSeconds:"Siguiente en xx",pause:"Pausa",play:"Play",playback:"Iniciar la reproducción",player:"Reproductor de video",prev:"Anterior",replay:"Replay",settings:"Configuración",skipmessage:"Pasar anuncio en xx",skiptext:"Pasar",videoQuality:"Calidad de video",volume:"Volumen"},fr:{admessage:"Fin de la publicité dans xx secondes",autoplayVideos:"Lecture automatique des vidéos",back:"Retour",captions:"Sous-titres",close:"Fermer",cuetext:"Publicité",fullscreen:"Plein écran",next:"Suivante",nextUp:"À suivre",nextUpInSeconds:"À suivre dans xx",pause:"Pause",play:"Lecture",playback:"Démarrer la lecture",player:"Lecteur vidéo",prev:"Précédente",replay:"Revoir",settings:"Paramètres",skipmessage:"Ignorer la publicité dans xx",skiptext:"Ignorer",videoQuality:"Qualité vidéo",volume:"Volume"},it:{admessage:"L'annuncio terminerà in xx secondi",autoplayVideos:"Riproduzione automatica",back:"Indietro",captions:"Didascalie",close:"Chiudi",cuetext:"Pubblicità",fullscreen:"Schermo intero",next:"Successivo",nextUp:"Prossimo",nextUpInSeconds:"Prossimo in xx",pause:"Pausa",play:"Riproduci",playback:"Avvia la riproduzione",player:"Lettore video",prev:"Precedente",replay:"Replay",settings:"Impostazioni",skipmessage:"Salta annuncio in xx",skiptext:"Salta",videoQuality:"Qualità video",volume:"Volume"},ja:{admessage:"広告はxx秒後に終了します",autoplayVideos:"動画を自動再生",back:"戻る",captions:"字幕",close:"閉じる",cuetext:"広告",fullscreen:"全画面",next:"次へ",nextUp:"次の動画",nextUpInSeconds:"次の動画まであとxx秒",pause:"一時停止",play:"再生",playback:"再生をスタート",player:"動画プレーヤー",prev:"前へ",replay:"もう一回見る",settings:"設定",skipmessage:"xx秒後に広告をスキップ",skiptext:"スキップ",videoQuality:"動画の品質",volume:"音量"},pl:{admessage:"Reklama skończy się za xx sek.",autoplayVideos:"Odtwarzaj automatycznie",back:"Wstecz",captions:"Napisy",close:"Zamknij",cuetext:"Reklama",fullscreen:"Pełny ekran",next:"Następny",nextUp:"Następny",nextUpInSeconds:"Następny za xx",pause:"Wstrzymaj",play:"Odtwarzaj",playback:"Rozpocznij odtwarzanie",player:"Odtwarzacz wideo",prev:"Poprzedni",replay:"Odtwarzaj ponownie",settings:"Ustawienia",skipmessage:"Pomiń reklamę za xx",skiptext:"Pomiń",videoQuality:"Jakość obrazu",volume:"Głośność"},pt:{admessage:"O anúncio vai acabar em xx segundos",autoplayVideos:"Vídeos AutoPlay",back:"Voltar",captions:"Legendas",close:"Fechar",cuetext:"Anúncio",fullscreen:"Tela cheia",next:"Próximo",nextUp:"Próximo",nextUpInSeconds:"Próximo em xx",pause:"Pausa",play:"Tocar",playback:"Iniciar a reprodução",player:"Player de vídeo",prev:"Anterior",replay:"Repetição",settings:"Configurações",skipmessage:"Pular anúncio em xx",skiptext:"Pular",videoQuality:"Qualidade de vídeo",volume:"Volume"},ru:{admessage:"Реклама закончится через xx секунд(ы)",autoplayVideos:"Автовоспроизведение",back:"Назад",captions:"Описания",close:"Закрыть",cuetext:"Реклама",fullscreen:"Во весь экран",next:"Далее",nextUp:"Следующее",nextUpInSeconds:"Следующее видео через xx сек.",pause:"Пауза",play:"Воспроизвести",playback:"Начать",player:"Видеоплеер",prev:"Предыдущее",replay:"Повторить",settings:"Настройки",skipmessage:"Пропустить рекламу через xx",skiptext:"Пропустить",videoQuality:"Качество видео",volume:"Громкость"},zh:{admessage:"广告将在xx秒结束",autoplayVideos:"自动播放视频",back:"返回",captions:"标题",close:"关闭",cuetext:"广告",fullscreen:"全屏",next:"下一个",nextUp:"即将播放",nextUpInSeconds:"等待xx秒即将播放",pause:"暂停",play:"播放",playback:"重新播放",player:"视频播放器",prev:"上一个",replay:"重播",settings:"设置",skipmessage:"等待xx秒跳过广告",skiptext:"跳过",videoQuality:"视频质量",volume:"音量"},"zh-hant":{admessage:"廣告將在xx秒後結束",autoplayVideos:"自動播放影片",back:"返回",captions:"標題",close:"關閉",cuetext:"廣告",fullscreen:"全螢幕",next:"下一個",nextUp:"即將播放",nextUpInSeconds:"等待xx秒即將播放",pause:"暫停",play:"播放",playback:"重新播放",player:"影片播放器",prev:"上一個",replay:"重新播放",settings:"設置",skipmessage:"在xx中跳過廣告",skiptext:"跳過",videoQuality:"影片品質",volume:"音量"}},y={play:'<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M14.767 9.437L3.858 16.903a.553.553 0 0 1-.565.037.531.531 0 0 1-.293-.473V1.533c0-.199.113-.381.293-.473a.557.557 0 0 1 .565.036l10.91 7.467A.53.53 0 0 1 15 9a.53.53 0 0 1-.233.437z" fill-rule="evenodd"/></svg>',pause:'<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd"><rect width="5" height="16" rx="1" x="2" y="1"/><rect x="11" width="5" height="16" rx="1" y="1"/></g></svg>',fullScreenOn:'<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M3.249 7H1V2h5v2.25H3.249zm11.502 0H17V2h-5v2.25h2.751zM3.249 11H1v5h5v-2.25H3.249zm11.502 0H17v5h-5v-2.25h2.751z" fill-rule="evenodd"/></svg>',fullScreenOff:'<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M3.751 2H6v5H1V4.75h2.751zm10.498 0H12v5h5V4.75h-2.751zM3.751 16H6v-5H1v2.25h2.751zm10.498 0H12v-5h5v2.25h-2.751z" fill-rule="evenodd"/></svg>',settings:'<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M9 7.09a1.909 1.909 0 1 1 0 3.819A1.909 1.909 0 0 1 9 7.09m-4.702-.03a1.07 1.07 0 0 1-.99.667h-.672A.637.637 0 0 0 2 8.364v1.272c0 .352.285.637.636.637h.672c.436 0 .824.264.99.667l.006.013c.167.403.08.864-.229 1.172L3.6 12.6a.636.636 0 0 0 0 .9l.9.9a.636.636 0 0 0 .9 0l.475-.475a1.072 1.072 0 0 1 1.185-.223c.403.166.667.554.667.99v.672c0 .35.285.636.637.636h1.272a.637.637 0 0 0 .637-.636v-.672c0-.436.264-.824.667-.99l.013-.006a1.07 1.07 0 0 1 1.172.229l.475.475a.636.636 0 0 0 .9 0l.9-.9a.636.636 0 0 0 0-.9l-.475-.475a1.072 1.072 0 0 1-.229-1.172l.006-.013a1.07 1.07 0 0 1 .99-.667h.672A.637.637 0 0 0 16 9.636V8.364a.637.637 0 0 0-.636-.637h-.672a1.07 1.07 0 0 1-.996-.68 1.072 1.072 0 0 1 .229-1.172L14.4 5.4a.636.636 0 0 0 0-.9l-.9-.9a.636.636 0 0 0-.9 0l-.475.475c-.308.308-.77.396-1.172.229l-.013-.006a1.07 1.07 0 0 1-.667-.99v-.672A.637.637 0 0 0 9.636 2H8.364a.637.637 0 0 0-.637.636v.672a1.07 1.07 0 0 1-.68.996 1.07 1.07 0 0 1-1.172-.229L5.4 3.6a.636.636 0 0 0-.9 0l-.9.9a.636.636 0 0 0 0 .9l.475.475a1.072 1.072 0 0 1 .223 1.185" fill-rule="evenodd"/></svg>',volumeOff:'<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M8.45 2.17L4.664 6.28H1.036C.256 6.28 0 6.739 0 7.175v3.522c0 .436.256.985 1.036.985h3.646l3.785 4.176a1.1 1.1 0 0 0 .533.143.964.964 0 0 0 .5-.137c.33-.185.5-.526.5-.897V3.013c0-.37-.17-.713-.5-.898-.33-.186-.72-.13-1.05.054zm7.192 7.33l2.121-2.122a.807.807 0 1 0-1.142-1.141l-2.122 2.12-2.12-2.12a.808.808 0 0 0-1.142 1.141L13.358 9.5l-2.121 2.121a.807.807 0 1 0 1.142 1.142l2.12-2.12 2.122 2.12a.805.805 0 0 0 1.142 0 .807.807 0 0 0 0-1.142L15.642 9.5z" fill-rule="evenodd"/></svg>',volumeOn:'<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd"><path d="M8.45 2.17L4.664 6.28H1.036C.256 6.28 0 6.739 0 7.175v3.522c0 .436.256.985 1.036.985h3.646l3.785 4.176a1.1 1.1 0 0 0 .533.143.964.964 0 0 0 .5-.137c.33-.185.5-.526.5-.897V3.013c0-.37-.17-.713-.5-.898-.33-.186-.72-.13-1.05.054zm4.95 10.156a4.393 4.393 0 0 0 0-6.19.708.708 0 0 0-1.004 1 2.978 2.978 0 0 1 0 4.192.707.707 0 1 0 1.003.998z"/><path d="M17.515 9.231A6.186 6.186 0 0 0 15.7 4.84a.707.707 0 1 0-1.003.998A4.777 4.777 0 0 1 16.1 9.231a4.778 4.778 0 0 1-1.4 3.394.708.708 0 1 0 1.002.999 6.186 6.186 0 0 0 1.814-4.393z"/></g></svg>',back:'<svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M6.003 10.002a.997.997 0 0 1-.707-.293L.293 4.707a.999.999 0 1 1 1.414-1.414l4.296 4.295 4.293-4.293A.999.999 0 1 1 11.71 4.71l-5 5a.997.997 0 0 1-.707.293" fill-rule="evenodd"/></svg>',quality:'<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-quality-100" viewBox="0 0 240 240"><path d="M55,200H35c-3,0-5-2-5-4c0,0,0,0,0-1v-30c0-3,2-5,4-5c0,0,0,0,1,0h20c3,0,5,2,5,4c0,0,0,0,0,1v30C60,198,58,200,55,200L55,200z M110,195v-70c0-3-2-5-4-5c0,0,0,0-1,0H85c-3,0-5,2-5,4c0,0,0,0,0,1v70c0,3,2,5,4,5c0,0,0,0,1,0h20C108,200,110,198,110,195L110,195z M160,195V85c0-3-2-5-4-5c0,0,0,0-1,0h-20c-3,0-5,2-5,4c0,0,0,0,0,1v110c0,3,2,5,4,5c0,0,0,0,1,0h20C158,200,160,198,160,195L160,195z M210,195V45c0-3-2-5-4-5c0,0,0,0-1,0h-20c-3,0-5,2-5,4c0,0,0,0,0,1v150c0,3,2,5,4,5c0,0,0,0,1,0h20C208,200,210,198,210,195L210,195z"></path></svg>'},v=[];window.wikiaJWPlayer=function(e,t,i){function n(e,t){var i=document.createElement("script"),n=document.getElementById(e);i.onload=function(){d.register(),v.forEach(function(e){e()})},i.async=!0,i.src=t||"https://content.jwplatform.com/libraries/VXc5h4Tf.js",n.parentNode.insertBefore(i,n.nextSibling)}function a(e,t,i){var n=jwplayer(e),a=t.videoDetails.playlist[0].mediaid,s=t.autoplay,o=t.lang||"en",l=o.substr(0,2),r=m[o]||m.en,c={advertising:{autoplayadsmuted:s,client:"googima",vpaidcontrols:!0,admessage:r.admessage,cuetext:r.cuetext,skipmessage:r.skipmessage,skiptext:r.skiptext,setLocale:l},autostart:s&&!document.hidden,description:t.videoDetails.description,image:"//content.jwplatform.com/thumbs/"+a+"-640.jpg",mute:t.mute,playlist:t.videoDetails.playlist,title:t.videoDetails.title,localization:r};return t.settings&&(c.plugins={wikiaSettings:{showAutoplayToggle:t.settings.showAutoplayToggle,showQuality:t.settings.showQuality,showCaptions:t.settings.showCaptions,autoplay:t.autoplay,selectedCaptionsLanguage:t.selectedCaptionsLanguage,i18n:r}}),t.related&&(c.related={autoplaytimer:t.related.time||3,file:"//cdn.jwplayer.com/v2/playlists/"+t.related.playlistId+"?related_media_id="+a,oncomplete:t.related.autoplay?"autoplay":"show",autoplaymessage:r.nextUpInSeconds}),i.info("setupPlayer"),n.setup(c),i.info("after setup"),i.subscribeToPlayerErrors(n),n}!function(e,t,i){"undefined"!=typeof jwplayer?i():(v.push(i),1===v.length&&n(e,t))}(e,t.playerURL,function(){var n=c(t),s=a(e,t,n);u(s),r(s,t.autoplay,n),t.related&&p(s),t.tracking&&(t.tracking.pixel=t.videoDetails.playlist[0].pixel,h(s,t.autoplay,t.tracking)),g(s,t.autoplay),l(s),i&&i(s)})};var f=new DOMParser;d.prototype._onClick=function(e,t){var i=t.bind(this);e.addEventListener("click",i),e.addEventListener("keydown",function(e){-1!==[13,32].indexOf(e.keyCode)&&(i(e),e.preventDefault(),e.stopPropagation())})},d.prototype.isSettingsMenuOrSettingsButton=function(e){var t=this.getSettingsButtonElement();return t&&(t===e||t.contains(e)||this.wikiaSettingsElement===e||this.wikiaSettingsElement.contains(e))},d.prototype.getSettingsButtonElement=function(){return this.player.getContainer().querySelector("[button="+this.buttonID+"]")},d.prototype.documentClickHandler=function(e){!this.isSettingsMenuOrSettingsButton(e.target)&&this.container.style.display&&this.close()},d.prototype.addButton=function(){var e=a(y.settings);e.classList.add("jw-svg-icon"),e.classList.add("jw-svg-icon-wikia-settings"),this.player.addButton(e.outerHTML,this.config.i18n.settings,function(){this.wikiaSettingsElement.style.display?this.close():this.open()}.bind(this),this.buttonID,"wikia-jw-settings-button")},d.prototype.removeButton=function(){this.player.removeButton(this.buttonID)},d.prototype.close=function(){this.showSettingsList(),this.container.style.display=null,this.player.getContainer().classList.remove("wikia-jw-settings-open")},d.prototype.open=function(){s(this.container),this.player.getContainer().classList.add("wikia-jw-settings-open")},d.prototype.hide=function(){this.close(),this.removeButton()},d.prototype.show=function(){this.getSettingsButtonElement()||this.addButton()},d.prototype.showSettingsList=function(){s(this.settingsList),o(this.qualityLevelsList),o(this.captionsList)},d.prototype.addSettingsContent=function(e){return e.classList.add("wikia-jw-settings"),e.classList.remove("jw-reset"),e.classList.remove("jw-plugin"),this.settingsList=this.createSettingsListElement(),e.appendChild(this.settingsList),this.config.showQuality&&(this.createQualityLevelsList(),e.appendChild(this.qualityLevelsList)),this.config.showCaptions&&(this.createCaptionsList(),e.appendChild(this.captionsList)),e},d.prototype.createSettingsListElement=function(){var e=document.createElement("ul");return e.className="wikia-jw-settings__list wds-list",this.config.showQuality&&e.appendChild(this.createQualityButton()),this.config.showCaptions&&e.appendChild(this.createCaptionsButton()),this.config.showAutoplayToggle&&(e.appendChild(this.createAutoplayToggle()),this.show()),e},d.prototype.createSubmenuWrapper=function(){var e=document.createElement("li"),t=document.createElement("ul");return e.className="wikia-jw-settings__back",e.tabIndex=0,e.innerHTML=i("left").outerHTML+" "+this.config.i18n.back,this._onClick(e,this.showSettingsList),t.className="wikia-jw-settings__submenu wds-list",t.appendChild(e),t},d.prototype.createAutoplayToggle=function(){var e=t({id:this.player.getContainer().id+"-videoAutoplayToggle",label:this.config.i18n.autoplayVideos,checked:this.config.autoplay}),i=e.querySelector("label");return this._onClick(i,function(e){this.player.trigger("autoplayToggle",{enabled:!e.target.previousSibling.checked})}),i.tabIndex=0,e},d.prototype.createQualityButton=function(){var e=document.createElement("li");return e.className="wikia-jw-settings__quality-button",e.tabIndex=0,e.innerHTML=this.config.i18n.videoQuality+i("right").outerHTML,this._onClick(e,function(){o(this.settingsList),s(this.qualityLevelsList)}),e},d.prototype.createQualityLevelsList=function(){this.qualityLevelsList=this.createSubmenuWrapper(),this.player.on("levelsChanged",this.updateCurrentQuality.bind(this))},d.prototype.onQualityLevelsChange=function(e){var t=!e.levels.length||1===e.levels.length&&"0"===e.levels[0].label,i=!t&&this.config.showQuality||this.config.showAutoplayToggle;t?this.wikiaSettingsElement.classList.add("is-quality-list-empty"):this.wikiaSettingsElement.classList.remove("is-quality-list-empty"),i&&this.show(),this.qualityLevelsList&&this.updateQualityLevelsList(e.levels)},d.prototype.updateQualityLevelsList=function(e){n(this.qualityLevelsList),e.forEach(function(e,t){var i=document.createElement("li");i.tabIndex=0,this._onClick(i,function(){this.player.setCurrentQuality(t),this.close()}),this.player.getCurrentQuality()===t&&i.classList.add("is-active"),i.appendChild(document.createTextNode(e.label)),this.qualityLevelsList.insertBefore(i,this.qualityLevelsList.lastElementChild)},this)},d.prototype.updateCurrentQuality=function(e){for(var t=0;t<this.qualityLevelsList.childNodes.length;t++){var i=this.qualityLevelsList.childNodes[t];e.currentQuality===t?i.classList.add("is-active"):i.classList.remove("is-active")}},d.prototype.onCaptionsChange=function(e){var t=this.getSuitableCaptionsIndex(this.config.selectedCaptionsLanguage||this.captionLangMap[this.getUserLang()],e.tracks);n(this.captionsList),this.captionsList&&e.tracks.length>1?(e.tracks.forEach(this.createCaptionsListItem,this),this.wikiaSettingsElement.classList.remove("are-captions-empty"),this.show(),!1!==this.config.selectedCaptionsLanguage&&-1!==t?this.player.setCurrentCaptions(t):this.player.setCurrentCaptions(0)):this.wikiaSettingsElement.classList.add("are-captions-empty")},d.prototype.createCaptionsList=function(){this.captionsList=this.createSubmenuWrapper(),this.player.on("captionsChanged",this.updateCurrentCaptions.bind(this))},d.prototype.createCaptionsListItem=function(e,t){var i=document.createElement("li"),n="Off"===e.label?"No captions":e.label;i.dataset.track=t,this._onClick(i,function(){this.player.setCurrentCaptions(t),this.close(),this.player.trigger("captionsSelected",{selectedLang:e.label})}),i.appendChild(document.createTextNode(n)),this.captionsList.insertBefore(i,this.captionsList.firstElementChild)},d.prototype.createCaptionsButton=function(){var e=document.createElement("li");return e.className="wikia-jw-settings__captions-button",e.innerHTML=this.config.i18n.captions+i("right").outerHTML,e.addEventListener("click",function(){o(this.settingsList),s(this.captionsList)}.bind(this)),e},d.prototype.getUserLang=function(){return(window.navigator.userLanguage||window.navigator.language).slice(0,2)},d.prototype.getSuitableCaptionsIndex=function(e,t){return t.map(function(e){return e.label}).indexOf(e)},d.prototype.updateCurrentCaptions=function(e){for(var t=0;t<this.captionsList.childNodes.length;t++)this.captionsList.childNodes[t].classList.remove("is-active");this.captionsList.querySelector('[data-track="'+e.track+'"]').classList.add("is-active")},d.prototype.captionLangMap={en:"English",pl:"Polish",fr:"French",de:"German",it:"Italian",ja:"Japanese",pt:"Portuguese",ru:"Russian",es:"Spanish",zh:"Chinese"},d.register=function(){jwplayer().registerPlugin("wikiaSettings","8.0.0",d)}}("undefined"==typeof wikiaJWPlayer?wikiaJWPlayer={}:wikiaJWPlayer);