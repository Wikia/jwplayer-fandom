#Notes on how to do manual deployments:

1. Go to the root of the project.
2. Run `yarn build-stand-alone` on the command prompt
3. Check that the `standalone-dist` directory is created at the root of the project
4. Deploy to the silver-surfer GCP folder by running `gsutil cp -r standalone-dist gs://silversurfer/video/test/`
   from the project root directory
5. Check that the files were deployed with `gsutil ls gs://silversurfer/video/test/standalone-dist`
6. If you need to rebuild, you can remove the deployed files on GCS with `gsutil rm -r gs://silversurfer/video/test/standalone-dist`
7. Caching sometimes gives issues with the new changes showing up. There should be a command in gsutil to disable/bust the cache, but in
   case that can't be found, the next best hacky solution is to change the name of the stand-alone JS that gets built, by changing it in the
   `rollup-stand-alone.config.js` file.
   ```javascript
   input: {
   	standAlone_RV_VideoPlayer: 'src/stand-alone/standalone-loader.tsx';
   }
   ```
   The `standAlone_RV_VideoPlayer` can be renamed to `standAlone_RV_VideoPlayer1` for example.
8. Repeat steps 2-7 to redeploy new builds

#How to embed this player on any page

1. Open the chrome dev console
2. Paste the following 4 lines into the console:

```javascript
const script = document.createElement('script');
script.src = 'https://static.wikia.nocookie.net/silversurfer/video/test/standalone-dist/standAlone_RV_VideoPlayer.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
```

3. This loads React and exposes a `loadPlayer` function on the `window` object.
4. Paste the following command into the console:

```javascript
window.loadPlayer({ contextName: 'giantbomb', mediaId: 'r46kS55a', embedSelector: '.av-player-container' });
```

5. Change the `embedSelector` value. The above code and embed was tested on the giant bomb video pages, such as the following link:
   https://www.giantbomb.com/shows/game-mess-mornings-12-09-22/2970-22041/free-video
6. The `embedSelector` uses `document.querySelector` under the hood, so an id or className can be passed.
