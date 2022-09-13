import React from 'react';
import styled from 'styled-components';
import IconExternalTiny from '@fandom-frontend/react-common/dist/icons/IconExternalTiny';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';

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
	const playlistItem = usePlaylistItem();
	if (playlistItem?.username === undefined || playlistItem?.userUrl === undefined) return null;

	return (
		<AttributionWrapper>
			<UsernameLink href={playlistItem.userUrl}>{playlistItem.username}</UsernameLink>
			<IconLink href={playlistItem.userUrl}>
				<IconExternalTiny />
			</IconLink>
		</AttributionWrapper>
	);
};

export default Attribution;
