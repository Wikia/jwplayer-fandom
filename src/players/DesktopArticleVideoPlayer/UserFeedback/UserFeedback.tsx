import React from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import CloseButton from 'players/DesktopArticleVideoPlayer/UserFeedback/CloseButton';
import ThumbDownButton from 'players/DesktopArticleVideoPlayer/UserFeedback/ThumbDownButton';
import ThumbUpButton from 'players/DesktopArticleVideoPlayer/UserFeedback/ThumbUpButton';

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

const UserFeedback: React.FC = () => (
	<UserFeedbackWrapper>
		<CloseButton />
		Do you like this video?
		<ThumbUpButton />
		<ThumbDownButton />
	</UserFeedbackWrapper>
);

export default UserFeedback;
