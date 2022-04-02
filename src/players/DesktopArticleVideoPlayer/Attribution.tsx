import React from 'react';
import { AttributionData } from 'types';
import styled from 'styled-components';
import IconExternalTiny from '@fandom-frontend/react-common/dist/icons/IconExternalTiny';

const UsernameLink = styled.a`
	color: rgba(var(--theme-page-text-color--rgb), 0.75);
`;

const IconLink = styled.a`
	color: rgba(var(--theme-page-text-color--rgb), 0.75);
	line-height: 0;
	margin-left: 6px;
`;

const AttributionWrapper = styled.div`
	border-bottom: 1px solid var(--theme-border-color);
	align-items: center;
	display: flex;
	justify-content: center;
	padding: 6px;
`;

const Attribution: React.FC<AttributionData> = ({ username, userUrl }) => {
	return (
		<AttributionWrapper>
			<UsernameLink href={userUrl}>{username}</UsernameLink>
			<IconLink href={userUrl}>
				<IconExternalTiny />
			</IconLink>
		</AttributionWrapper>
	);
};

export default Attribution;
