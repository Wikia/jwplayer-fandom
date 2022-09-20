import React from 'react';
import styled from 'styled-components';
import Svg, { svgDefaultStyles, SvgIconProps } from 'experimental/shared/Svg';

const StyledPlayIcon = styled(Svg)<SvgIconProps>`
	${svgDefaultStyles}
`;

export default (props: SvgIconProps) => {
	return (
		<StyledPlayIcon {...props}>
			<path d="M62.8,199.5c-1,0.8-2.4,0.6-3.3-0.4c-0.4-0.5-0.6-1.1-0.5-1.8V42.6c-0.2-1.3,0.7-2.4,1.9-2.6c0.7-0.1,1.3,0.1,1.9,0.4l154.7,77.7c2.1,1.1,2.1,2.8,0,3.8L62.8,199.5z" />
		</StyledPlayIcon>
	);
};
