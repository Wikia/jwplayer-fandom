import React from 'react';

import styles from './svg.module.scss';

export interface SvgIconProps {
	height?: string;
	width?: string;
	fill?: string;
	viewBox?: string;
}

const Svg: React.FC<SvgIconProps> = ({ height, width, fill }) => {
	const svgStyleOverrides = {
		...(height && { height }),
		...(width && { width }),
		...(fill && { fill }),
	};

	return (
		<svg
			className={styles.svg}
			style={svgStyleOverrides}
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 240 240"
		/>
	);
};

export default Svg;
