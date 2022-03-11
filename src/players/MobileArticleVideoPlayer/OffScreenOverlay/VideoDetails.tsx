import React from 'react';
import usePlaylistItem from 'utils/usePlaylistItem';
import styled, { css } from 'styled-components';
import { formatTime } from 'utils/formatTime';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';

interface VideoDetailsWrapperProps {
	collapsed: boolean;
}

const VideoDetailsWrapper = styled.div<VideoDetailsWrapperProps>`
	background-color: ${WDSVariables.wdsColorWhite};
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 13px 12px 15px;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;

	${(props) =>
		props.collapsed &&
		css`
			transform: translate(0, -100%);
			transition: transform 0.3s;
			background: transparent;
		`}
`;

const VideoTitle = styled.h2`
	line-height: 1.14em;
	margin-right: 6px;
	margin-top: 4px;

	color: ${WDSVariables.wdsColorBlack};
	font-size: ${WDSVariables.wdsFontSizeBase};
	font-weight: ${WDSVariables.wdsFontWeightMedium};
`;

const VideoDuration = styled.span`
	background: #272727;
	border-radius: 3px;
	line-height: 1;
	opacity: 0.9;
	padding: 3px 5px;

	color: ${WDSVariables.wdsColorWhite};
	font-size: ${WDSVariables.wdsFontSizeXs};
	font-weight: ${WDSVariables.wdsFontWeightMedium};
`;

interface VideoDetailsProps {
	playing: boolean;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({ playing }) => {
	const { duration, title } = usePlaylistItem();

	if (!(duration && title)) return null;

	return (
		<VideoDetailsWrapper collapsed={playing}>
			<VideoTitle>{title}</VideoTitle>
			<VideoDuration>{formatTime(duration)}</VideoDuration>
		</VideoDetailsWrapper>
	);
};

export default VideoDetails;
