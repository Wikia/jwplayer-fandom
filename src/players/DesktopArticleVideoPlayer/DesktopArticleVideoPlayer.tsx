import React, { useRef, useState, useEffect } from 'react';
import { communicationService, ofType } from 'utils/communication';
import styled, { css } from 'styled-components';
import UnmuteButton from 'players/DesktopArticleVideoPlayer/UnmuteButton';
import UserFeedback from 'players/DesktopArticleVideoPlayer/UserFeedback/UserFeedback';
import JwPlayerWrapper from 'players/shared/JwPlayerWrapper';
import VideoDetails from 'players/DesktopArticleVideoPlayer/VideoDetails';
import useOnScreen from 'utils/useOnScreen';
import { race, timer } from 'rxjs';
import { first } from 'rxjs/operators';

import PlayerWrapper from '../shared/PlayerWrapper';

const DesktopArticleVideoTopPlaceholder = styled.div`
	background-color: black;
`;

const UserActionTopBar = styled.div`
	padding: 5px 8px;
	position: absolute;
	top: 6px;
	z-index: 2;
	width: 100%;
`;

const adEngineTimeout = 2000;

const waitForAdEngine = () => {
	// to prevent prettier reformatting this line and then spitting out errors
	// prettier-ignore
	const adEngineConfigured$ = communicationService.action$.pipe(ofType('[AdEngine] Configured'), first());
	const adEngineTimeout$ = timer(adEngineTimeout);

	return race(adEngineConfigured$, adEngineTimeout$).toPromise();
};

const listenSetupJWPlayer = (callback) => {
	communicationService.action$.pipe(ofType('[Ad Engine] Setup JWPlayer'), first()).subscribe(callback);
};

interface Props {
	onScreen: boolean;
}

const DesktopArticleVideoWrapper = styled.div<Props>`
	${(props) =>
		!props.onScreen &&
		css`
			bottom: 18px;
			left: auto;
			position: fixed;
			right: 18px;
			top: auto;
			-webkit-transition: right 0.4s, bottom 0.4s, width 0.4s;
			transition: right 0.4s, bottom 0.4s, width 0.4s;
			width: 300px;
		`}
`;

const DesktopArticleVideoPlayer: React.FC = () => {
	const ref = useRef<HTMLDivElement>(null);
	const onScreen = useOnScreen(ref);
	const [adComplete, setAdComplete] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			communicationService.dispatch({ type: '[AdEngine OptIn] set opt in' });
		}, 2000);
		setTimeout(() => {
			communicationService.dispatch({ type: '[AdEngine] Configured' });
		}, 2000);
		setTimeout(() => {
			communicationService.dispatch({ type: '[Ad Engine] Setup JWPlayer' });
		}, 2000);
	}, []);

	useEffect(() => {
		communicationService.action$.pipe(ofType('[AdEngine OptIn] set opt in'), first()).subscribe(() => {
			waitForAdEngine().then(() => {
				listenSetupJWPlayer(function () {
					setAdComplete(true);
				});
			});
		});
	}, []);

	if (adComplete) {
		return (
			<PlayerWrapper>
				<DesktopArticleVideoTopPlaceholder ref={ref}>
					<DesktopArticleVideoWrapper onScreen={onScreen}>
						<UserActionTopBar>
							{onScreen ? (
								<>
									{/* Default muted, once unmuted do not show again */}
									<UnmuteButton />
									<UserFeedback />
								</>
							) : (
								// TODO: close icon on right
								<div></div>
							)}
						</UserActionTopBar>
						<JwPlayerWrapper />
						{!onScreen && <VideoDetails />}
					</DesktopArticleVideoWrapper>
				</DesktopArticleVideoTopPlaceholder>
			</PlayerWrapper>
		);
	}

	return null;
};

export default DesktopArticleVideoPlayer;
