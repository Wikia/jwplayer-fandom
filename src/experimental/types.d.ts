import React from 'react';

export interface VolumeStateWrapperProps {
	iconColor?: string;
	sliderColor?: string;
	hasLabel?: boolean;
	hasSlider?: boolean;
}

export interface VolumeSliderProps {
	hover: boolean;
	color?: string;
}

export interface ContentPlayerOverlayProps {
	isScrollPlayer: boolean;
}

export interface PrerollPlayerOverlayProps {
	isScrollPlayer: boolean;
}

export interface TimeSliderProps {
	className?: string;
	railColor?: string;
	bufferColor?: string;
	knobColor?: string;
	progressColor?: string;
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
}

export interface DesktopScrollVideoTopContentProps {
	isScrollPlayer: boolean;
	onCloseClick: () => void;
}

export interface PlayerOverlayProps {
	children?: React.ReactNode;
	forceOverlay?: boolean;
}
