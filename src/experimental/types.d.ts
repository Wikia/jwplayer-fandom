import React from 'react';

export interface VolumeStateWrapperProps {
	iconColor?: string;
	sliderColor?: string;
	hasLabel?: boolean;
	hasSlider?: boolean;
	callback?: () => void;
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
	showOverlay: boolean;
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
