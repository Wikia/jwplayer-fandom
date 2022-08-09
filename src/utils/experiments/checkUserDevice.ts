export enum UserDeviceType {
	Desktop = 'desktop',
	Mobile = 'mobile',
	Tablet = 'tablet',
	Unknown = 'unknown',
}

export default function checkUserDevice(): UserDeviceType {
	let userDevice = UserDeviceType.Unknown;

	// calculate user device type based on maximum width values per device
	if (window.matchMedia('(max-width: 767px)').matches) {
		userDevice = UserDeviceType.Mobile;
	} else if (window.matchMedia('(min-width: 768px) and (max-width: 991px)').matches) {
		userDevice = UserDeviceType.Tablet;
	} else if (window.matchMedia('(min-width: 992px)').matches) {
		userDevice = UserDeviceType.Desktop;
	}

	return userDevice;
}
