import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import CloseButton from 'players/DesktopArticleVideoPlayer/UserFeedback/CloseButton';
import ThumbDownButton from 'players/DesktopArticleVideoPlayer/UserFeedback/ThumbDownButton';
import ThumbUpButton from 'players/DesktopArticleVideoPlayer/UserFeedback/ThumbUpButton';
import { PlayerContext } from 'players/shared/PlayerContext';

const UserFeedbackWrapper = styled.div`
	position: absolute;
	top: 6px;
	right: 6px;
	z-index: 2;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.9);
	border-radius: 2px;
	font-size: 14px;
	max-width: 90%;
	padding: 5px 8px;
	display: flex;
	height: 34px;
	box-sizing: border-box;
	color: ${WDSVariables.wdsColorDarkBlueGray};
`;

const UserFeedback: React.FC = () => {
	const [visible, setVisible] = useState(false);
	const [dismissed, setDismissed] = useState(false);
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		player?.on('play', (event: { position: number }) => handlePlay(event));
		player?.on('pause', () => setVisible(false));

		return () => {
			player?.off('play', (event: { position: number }) => handlePlay(event));
			player?.off('pause', () => setVisible(false));
		};
	}, [player]);

	const setVisibleTimeCheck = (event: { position: number }) => {
		if (event.position > 5 && player.getState() === 'playing') {
			player?.off('time', setVisibleTimeCheck);
			setVisible(true);
		}
	};

	const handlePlay = (event: { position: number }) => {
		if (event.position > 5) {
			setVisible(true);
		} else {
			player?.on('time', setVisibleTimeCheck);
		}
	};

	if (!visible || dismissed) return null;

	return (
		<UserFeedbackWrapper>
			<CloseButton dismissed={() => setDismissed(true)} />
			Do you like this video?
			<ThumbUpButton dismissed={() => setDismissed(true)} />
			<ThumbDownButton dismissed={() => setDismissed(true)} />
		</UserFeedbackWrapper>
	);
};

export default UserFeedback;
