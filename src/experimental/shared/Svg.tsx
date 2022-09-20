import styled, { css } from 'styled-components';

export const svgDefaultStyles = css<SvgIconProps>`
	height: ${(props) => (props?.height ? props?.height : '24px')};
	width: ${(props) => (props?.width ? props?.width : '24px')};
	fill: ${(props) => (props?.fill ? props?.fill : 'currentColor')};
	box-sizing: border-box;
`;

export interface SvgIconProps {
	height?: string;
	width?: string;
	fill?: string;
}

export default styled.svg.attrs({
	version: '1.1',
	xmlns: 'http://www.w3.org/2000/svg',
	xmlnsXlink: 'http://www.w3.org/1999/xlink',
	viewBox: '0 0 240 240',
})``;
