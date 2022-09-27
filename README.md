# JWPlayer (Fandom Version)

This repository contains Fandom's custom solution/wrapper for media reproduction to deliver seamless video experiences using [JWPlayer](https://developer.jwplayer.com/jwplayer/docs).

**Note**:

- This player has registered the `wirewax` plugin as default
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

## Developing

The first thing you need to do is to install the dependencies & run `watch`.

- Clone repo
- Run `yarn install`
- Run `yarn run watch` to watch for file changes and run project

## Publishing a new version

- Bump version and publish with `yarn pub:[patch|minor|major]` (e.g. `yarn pub:minor`).
- If you don't have your artifactory credentials on `~/.npmrc` get them [here](https://fandom.atlassian.net/wiki/spaces/GEN/pages/110592255/Artifactory+-+Internal+package+repositories).

## JenkinsJob

See at: http://prod.jenkins.service.sjc.consul:8080/job/JWPlayer/
