import React from 'react';
import styled from 'styled-components';
import IconExternalTiny from '@fandom-frontend/react-common/dist/icons/IconExternalTiny';
import usePlaylistItem from 'utils/usePlaylistItem';

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

const Attribution: React.FC = () => {
	const playlistListItem = usePlaylistItem();
	if (playlistListItem?.username === undefined || playlistListItem?.userUrl === undefined) return null;

	return (
		<AttributionWrapper>
			<UsernameLink href={playlistListItem.userUrl}>{playlistListItem.username}</UsernameLink>
			<IconLink href={playlistListItem.userUrl}>
				<IconExternalTiny />
			</IconLink>
		</AttributionWrapper>
	);
};

export default Attribution;
