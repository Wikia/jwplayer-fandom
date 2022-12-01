import React from 'react';

export interface VolumeStateWrapperProps {
	iconColor?: string;
	sliderColor?: string;
	hasLabel?: boolean;
	isScrollPlayer?: boolean;
}

export interface VolumeSliderProps {
	hover: boolean;
	color?: string;
}

export interface ContentPlayerOverlayProps {
	showOverlay: boolean;
	isScrollPlayer: boolean;
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
}

export interface MobileReskinnedArticleVideoPlayerContentOverlayProps {
	isScrollPlayer: boolean;
	showOverlay: boolean;
}

export interface MobileReskinnedArticleVideoPlayerContentFullOverlayProps {
	showOverlay: boolean;
}

export interface MobileReskinnedArticleVideoPlayerContentScrollOverlayProps {
	showOverlay: boolean;
}

export interface MobileReskinnedArticleVideoPlayerPrerollOverlayProps {
	isScrollPlayer: boolean;
	showOverlay: boolean;
}

export interface MobileReskinnedArticleVideoPlayerPrerollFullOverlayProps {
	showOverlay: boolean;
}

export interface MobileReskinnedArticleVideoPlayerPrerollScrollOverlayProps {
	showOverlay: boolean;
}
