import React from 'react';
import styled from 'styled-components';
import { CaptionsSelectProps } from 'experimental/types';
import IconBubble from '@fandom-frontend/react-common/dist/icons/IconBubble';
import CaptionSelectList from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/content/CaptionSelectList';

const StyledIconBubble = styled(IconBubble)`
	fill: #fff;
	flex-shrink: 0;
	height: 14px;
	margin-right: 6px;
	min-width: 14px;
	width: 14px;
`;

const CaptionsSelect: React.FC<CaptionsSelectProps> = ({ tracksList }) => {
	return (
		<>
			<CaptionSelectList tracksList={tracksList} />
			<StyledIconBubble />
		</>
	);
};

export default CaptionsSelect;
