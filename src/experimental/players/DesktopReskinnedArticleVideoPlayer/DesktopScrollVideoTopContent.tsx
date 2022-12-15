import { DesktopScrollVideoTopContentProps } from 'experimental/types';
import React from 'react';
import styled from 'styled-components';
import useAdStarted from 'jwplayer/utils/useAdStarted';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';
import useAdTime from 'jwplayer/utils/useAdTime';
import CloseButton from 'jwplayer/players/shared/CloseButton';

const DesktopScrollVideoTopContainer = styled.div`
	display: flex;
	width: 100%;
	jusity-content: space-between;
	align-items: center;
	justify-content: center;
	padding: 12px 18px 12px 18px;
	box-sizing: border-box;
	background-color: #ffffff;
	cursor: pointer;
	height: 70px;
`;

const DesktopScrollVideoTopWrapperTextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	overflow: hidden;
`;

const UpperText = styled.div`
	font-family: 'Rubik';
	font-weight: 400;
	font-size: 10px;
	color: #aaaaaa;
	padding-bottom: 4px;
`;

const LowerText = styled.div`
	font-family: 'Rubik';
	font-weight: 500;
	font-size: 14px;
	color: #333333;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const CloseButtonSmall = styled(CloseButton)`
	width: 14px;
	height: 14px;
	margin-left: 20px;
`;

const DesktopScrollVideoTopContent: React.FC<DesktopScrollVideoTopContentProps> = ({
	isScrollPlayer,
	onCloseClick,
	handleClick,
}) => {
	const adStarted = useAdStarted();
	const playlistItem = usePlaylistItem();
	const adTime = useAdTime();
	let upperText = 'Now Playing';

	if (adStarted) {
		const adSeconds = Math.trunc(adTime?.duration - adTime?.position);
		const timeLabel = adSeconds === 1 ? 'second' : 'seconds';

		upperText = `Up next in ${adSeconds} ${timeLabel}`;
	}

	const lowerText = playlistItem?.title;

	if (!isScrollPlayer) return null;

	return (
		<DesktopScrollVideoTopContainer onClick={handleClick}>
			<DesktopScrollVideoTopWrapperTextWrapper>
				<UpperText>{upperText}</UpperText>
				<LowerText>{lowerText}</LowerText>
			</DesktopScrollVideoTopWrapperTextWrapper>
			<CloseButtonSmall dismiss={onCloseClick} iconColor={'#333333'} />
		</DesktopScrollVideoTopContainer>
	);
};

export default DesktopScrollVideoTopContent;