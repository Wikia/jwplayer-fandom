import React from 'react';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import styled from 'styled-components';

const PlayStateContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const PrerollPlayerScrollOverlay: React.FC = () => {
	return (
		<>
			<PlayStateContainer>
				<PlayStateWrapper iconColor={'#fff'} />
			</PlayStateContainer>
			{/* control bar (bottom) */}
		</>
	);
};

export default PrerollPlayerScrollOverlay;
