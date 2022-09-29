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
	setDismissed: (dismissed: boolean) => void;
}

export interface PrerollPlayerOverlayProps {
	isScrollPlayer: boolean;
	setDismissed: (dismissed: boolean) => void;
}

export interface TimeSliderProps {
	className?: string;
	interactive?: boolean;
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
}
