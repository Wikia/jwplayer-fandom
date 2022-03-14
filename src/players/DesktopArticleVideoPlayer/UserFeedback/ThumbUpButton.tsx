import React from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';

const ThumbUpWrapper = styled.div`
	align-items: center;
	border-radius: 50%;
	cursor: pointer;
	display: flex;
	flex-shrink: 0;
	height: 22px;
	justify-content: center;
	margin-left: 12px;
	width: 22px;
	background-color: ${WDSVariables.wdsColorSuccess};
`;

interface ThumbUpButtonProps {
	dismiss: () => void;
}

const ThumbUpButton: React.FC<ThumbUpButtonProps> = ({ dismiss }) => {
	const thumbUpFeedback = () => {
		// TODO: figure out tracking, potentially see: unified-platform/node_modules/jwplayer-fandom/src/tracking.js
		dismiss();
	};

	return (
		<ThumbUpWrapper onClick={thumbUpFeedback}>
			<svg width="13" height="12" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg">
				<g fill="#FFF" fillRule="evenodd">
					<path d="M11.103 4.503H8.59V3.106c0-.977-.587-2.402-1.537-2.96-.14-.057-.28-.113-.42-.113a.84.84 0 0 0-.837.838v2.125L3.56 5.677v5.14l.866.42c.67.334 1.453.53 2.207.53h3.91c.756 0 1.398-.615 1.398-1.37l.56-4.44v-.03c0-.81-.615-1.424-1.397-1.424zm-8.38.56H1.045c-.168 0-.28.11-.28.28v6.144c0 .168.112.28.28.28h1.676c.168 0 .28-.112.28-.28V5.34c0-.166-.112-.28-.28-.28z" />
				</g>
			</svg>
		</ThumbUpWrapper>
	);
};

export default ThumbUpButton;
