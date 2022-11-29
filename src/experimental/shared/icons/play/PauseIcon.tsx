import styled from 'styled-components';
import Svg, { svgDefaultStyles, SvgIconProps } from 'experimental/shared/Svg';
import React from 'react';

const StyledPauseIcon = styled(Svg)<SvgIconProps>`
	${svgDefaultStyles}
`;

export default (props: SvgIconProps) => {
	return (
		<StyledPauseIcon {...props} viewBox="0 0 240 240">
			<path d="M100,194.9c0.2,2.6-1.8,4.8-4.4,5c-0.2,0-0.4,0-0.6,0H65c-2.6,0.2-4.8-1.8-5-4.4c0-0.2,0-0.4,0-0.6V45c-0.2-2.6,1.8-4.8,4.4-5c0.2,0,0.4,0,0.6,0h30c2.6-0.2,4.8,1.8,5,4.4c0,0.2,0,0.4,0,0.6V194.9z M180,45.1c0.2-2.6-1.8-4.8-4.4-5c-0.2,0-0.4,0-0.6,0h-30c-2.6-0.2-4.8,1.8-5,4.4c0,0.2,0,0.4,0,0.6V195c-0.2,2.6,1.8,4.8,4.4,5c0.2,0,0.4,0,0.6,0h30c2.6,0.2,4.8-1.8,5-4.4c0-0.2,0-0.4,0-0.6V45.1z" />
		</StyledPauseIcon>
	);
};