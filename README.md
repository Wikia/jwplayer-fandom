# JWPlayer (Fandom Version)

This repository contains Fandom's custom solution/wrapper for media reproduction to deliver seamless video experiences using [JWPlayer](https://developer.jwplayer.com/jwplayer/docs).

**Note**:

- This project is bundled up using [rollup](https://rollupjs.org/guide/en/#installation).

## Usage

1. Install the package in your project.

```bash
yarn add jwplayer-fandom
```

2. The main component is called `VideoPlayer` and accepts an URL with `mediaId` in its `playlist` prop.

```js
import { VideoPlayer } from 'jwplayer-fandom';

function App() {
	return (
		<div style={{ width: '60%' }}>
			<VideoPlayer playlist={'https://cdn.jwplayer.com/v2/media/dWVV3F7S'} />
		</div>
	);
}

export default App;
```

3. There are also loaders created for specific app. The `DesktopArticleVideoLoader` and `MobileArticleVideoLoader` were created
   for the unified-platform's desktop and mobile version of the skins respectively. Each of the loaders can load different players depending
   on certain conditions such as experiment params (covered later) or certain query params.

### JWPlayer & Server Side Render (SSR)

The player has some initialization steps that need to happen client side, for this reason it doesn't play nicely with SSR at the moment. In order to embed the player in a SSR environment please consider the next usage:

```js
import dynamic from 'next/dynamic';

const JWPlayerFandom = dynamic(() => import('@fandom/jwplayer-fandom').then((module) => module.VideoPlayer), {
	ssr: false,
});
```

Read more about how `dynamic` works from [NextJS/dynamic-import](https://nextjs.org/docs/advanced-features/dynamic-import).

## Tracking

By default, we log all JWPlayer events through our tracking library [browser-tracking-metrics](https://github.com/Wikia/browser-tracking-metrics).
Which will send the tracking event to the correct place if it has GTM tag that matches the `event`.

For timings, they will be automatically sent just to DW (not GA) without configuring any GTM tags.

Read more about how to implement and use them [here](https://github.com/Wikia/browser-tracking-metrics#usage).

## Running Experiments

We use Optimizely for AB testing. There is OptimizelyContext that provides data about active experiments to all the components.
To check if the variant is active for a given experiment, use `useOptimizelyVariation` hook:

    ```js
    const MY_OPTIMIZELY_EXPERIMENT_ID = '1234567890';
    const MY_OPTIMIZELY_EXPERIMENT_VARIATION_1 = 'my-variation-name';
    const myExperimentVariation = useOptimizelyVariation(MY_OPTIMIZELY_EXPERIMENT_ID);
    const isMyVariationActive = myExperimentVariation === MY_OPTIMIZELY_EXPERIMENT_VARIATION_1;
    ```

## Special Non-JW Player Takeovers

### Youtube Takeover

There are some cases where non JW Players will be loaded on the pages. The Youtube Embed is an example of this. A custom React wrapper was written around the Youtube Embed API code, and the Youtube player can be loaded on our Media Wiki pages when the correct variables are present.

#### What causes the Youtube Embed to load

- Targeting in the [Video Targeting CMS](https://fandom.com/video/cms/video-targeting)
  where the `Is Youtube Takeover` field is set to `true` and a valid `Youtube Video Id` is set.
- The `youtube_embed_video_id` query param is present in the URL, with a valid youtube video id

## Developing

The first thing you need to do is to clone repo, install dependencies and run `yarn build`.

- Clone repo
- Run `yarn install`
- Run `yarn start` to build the player inside the `/dist` directory and watch for changes and start test app (which lives in `test-jw` directory).
- Open up the `App.js` file in `/test-jw/src/` and check that the right player is loading in the app.
  The default one that should be loaded is the `DesktopArticleVideoLoader`.
  This will load the Desktop version of the JWPlayer that's loaded on all of our wiki pages.
- By now, the Video Player should've loaded for you. Make sure that in this case, the `DesktopArticleVideoLoader` component has the `videoDetails` prop
  passed to it. There is a sample of the `videoDetails` prop imported in the `App.js` file by default. All the samples are set in the
  `/test-jw/src/videoConfigs.js` file.
- When the JWPlayer changes are ready to be tested on other apps, such as [unified-platform](https://github.com/Wikia/unified-platform), then you can change
  the `version` variable in the `package.json`, and add in `test-1` or something along those lines. There's no easy way to test the jwplayer package
  without deploying it to artifactory. Deployment steps are covered below. For testing packages on other apps, a plain `yarn pub` works. No need to add params to it.

### Standalone player

Instead of using `/test-jw/src` app for testing the standalone player you can work on it in a slightly different way using [Requestly](https://requestly.io/).

- Clone repo
- Run `yarn install`
- Run `yarn build` to build the player inside the `/stand-alone/standalone-dist` directory
- Run `yarn run serveFilesOnBrowser` to serve files from your localhost
- At this point visiting `http://localhost:3000/stand-alone/standalone-dist/standAlone_RV_VideoPlayer.js` should result in loading JS content
- Setup Requestly (add new rule -> Redirect Request) so it replaces calls to `https://static.wikia.nocookie.net/silversurfer/video/prod/standalone-dist/standAlone_RV_VideoPlayer.js` with the localhost version
- Open a page that calls for the original player asset for example `https://www.gamespot.com/articles/lies-of-p-everything-we-know-about-the-pinocchio-souls-like/1100-6510117/`
- In Requestly tab in the dev tools a record about the redirect should appear and the player loaded on the page is your localhost version

## Publishing a new version

- Bump version and publish with `yarn pub:[patch|minor|major]` (e.g. `yarn pub:minor`).
- If you don't have your artifactory credentials on `~/.npmrc` get them [here](https://fandom.atlassian.net/wiki/spaces/GEN/pages/110592255/Artifactory+-+Internal+package+repositories).

## Removing unused test version

- run `node scripts/artifactory-cleanup.js`
- see a comment in the script file for more details

## JenkinsJob

See at: http://prod.jenkins.service.sjc.consul:8080/job/JWPlayer/
