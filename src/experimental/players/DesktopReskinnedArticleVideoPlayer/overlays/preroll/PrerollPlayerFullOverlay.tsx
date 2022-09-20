import React from 'react';

import PrerollOverlayTimeSlider from './PrerollOverlayTimeSlider';

const PrerollPlayerFullOverlay: React.FC = () => {
	return (
		<>
			<PrerollOverlayTimeSlider interactive={false} progressColor={'#FFC500'} />
		</>
	);
};

export default PrerollPlayerFullOverlay;
