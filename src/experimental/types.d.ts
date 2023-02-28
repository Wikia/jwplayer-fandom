import React from 'react';

import { MobileArticleVideoPlayerProps, DesktopArticleVideoPlayerProps } from '../jwplayer/types';
export interface VolumeStateWrapperProps {
	iconColor?: string;
	sliderColor?: string;
	hasLabel?: boolean;
	hasSlider?: boolean;
	callback?: () => void;
	iconSize?: string;
	className?: string;
}

export interface PlayButtonProps {
	/** Optional, additional events that should fire whenever the Play button is pressed.
	 *  The actual video player "play" event will already be handled in the onClickPlay function.
	 *
	 *  There is no need to call the player.play() event in this callback */
	onClickCallback?: () => void;
	isAd?: boolean;
	iconSize?: string;
}

export interface PauseButtonProps {
	/** Optional, additional events that should fire whenever the pause button is pressed.
	 *  The actual video player "pause" event will already be handled in the onClickPause function.
	 *
	 *  There is no need to call the player.pause() event in this callback */
	onClickCallback?: () => void;
	isAd?: boolean;
	iconSize?: string;
}

export interface PlayStateWrapperProps {
	playConfig?: PlayButtonProps;
	pauseConfig?: PauseButtonProps;
	iconColor?: string;
	isAd?: boolean;
	className?: string;
	iconSize?: string;
}

export interface VolumeSliderProps {
	hover: boolean;
	color?: string;
}

export interface ContentPlayerOverlayProps {
	showOverlay: boolean;
	isScrollPlayer: boolean;
}

export interface MobileContentPlayerOverlayProps {
	showOverlay: boolean;
	isScrollPlayer: boolean;
	resetOverlayTimeout: () => void;
}

export interface PrerollPlayerOverlayProps {
	isScrollPlayer: boolean;
	showOverlay?: boolean;
}

export interface TimeSliderProps {
	className?: string;
	railColor?: string;
	bufferColor?: string;
	knobColor?: string;
	progressColor?: string;
	railHeight?: string;
	canSeek?: boolean;
	isMobile?: boolean;
}

export interface PlayerFullOverlayTopTextProps {
	upperText: string;
	lowerText: string;
}

export interface PlayerCTAButtonProps {
	text: string;
	onClick: () => void;
	isScrollPlayer?: boolean;
}

export interface DesktopReskinnedArticleVideoPlayerOverlayProps {
	isScrollPlayer: boolean;
	showOverlay: boolean;
}

export interface DesktopScrollVideoTopContentProps {
	isScrollPlayer: boolean;
	onCloseClick: () => void;
	handleClick: () => void;
}

export interface PlayerOverlayProps {
	children?: React.ReactNode;
	showOverlay?: boolean;
	handleOverlayClick?: () => void;
	className?: string;
}

export interface MobileReskinnedArticleVideoPlayerOverlayProps {
	isScrollPlayer: boolean;
	showOverlay: boolean;
	resetOverlayTimeout: () => void;
}

export interface MobileReskinnedArticleVideoPlayerContentOverlayProps {
	isScrollPlayer: boolean;
	showOverlay: boolean;
}

export interface MobileReskinnedArticleVideoPlayerPrerollOverlayProps {
	isScrollPlayer: boolean;
	showOverlay: boolean;
}

export interface MobileContentPlayerOverlay {
	resetOverlayTimeout: () => void;
}

export interface ToggleCaptionsProps {
	resetOverlayTimeout: () => void;
}

export interface DesktopPauseAfterPlayPlayerProps extends DesktopArticleVideoPlayerProps {
	playerName?: string;
	playsBeforePause: number;
}

export interface MobilePauseAfterPlayPlayerProps extends MobileArticleVideoPlayerProps {
	playerName?: string;
	playsBeforePause: number;
}
