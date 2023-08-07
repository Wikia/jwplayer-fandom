import React, { useState, useContext } from 'react';
import useMute from 'jwplayer/utils/useMute';
import { VolumeStateWrapperProps } from 'experimental/types';
import IconSoundOff from '@fandom-frontend/react-common/dist/icons/IconSoundOff';
import IconSound from '@fandom-frontend/react-common/dist/icons/IconSound';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import VolumeSlider from 'experimental/shared/volume-state/VolumeSlider';
import clsx from 'clsx';

import styles from './VolumeStateWrapper.module.css';

const VolumeStateWrapper: React.FC<VolumeStateWrapperProps> = ({
	iconColor = '#fff',
	sliderColor = 'rgb(0, 214, 214)',
	hasSlider = false,
	hasLabel = false,
	callback,
	iconSize,
	className,
}) => {
	const { player } = useContext(PlayerContext);
	const mute = useMute();
	const [hover, setHover] = useState(false);

	const onClick = (event) => {
		player?.setMute(!mute);
		event.stopPropagation();
		if (callback) {
			callback();
		}
	};

	return (
		<div
			className={clsx(styles.wrapper, {
				[className]: !!className,
			})}
			onClick={onClick}
			style={{ color: iconColor }}
		>
			<div
				className={styles.soundButtonWrapper}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				{hasSlider && <VolumeSlider color={sliderColor} hover={hover} />}
				{mute ? (
					<IconSoundOff
						className={styles.soundOffIcon}
						style={{ fill: iconColor }}
						width={iconSize || '16px'}
						height={iconSize || '16px'}
					/>
				) : (
					<IconSound
						className={styles.soundIcon}
						style={{ fill: iconColor }}
						width={iconSize || '16px'}
						height={iconSize || '16px'}
					/>
				)}
			</div>
			{mute && hasLabel && <div className={styles.label}>Play Sound</div>}
		</div>
	);
};

export default VolumeStateWrapper;
