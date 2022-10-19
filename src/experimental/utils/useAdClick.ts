export const useAdClick = () => {
	const clickEvent = new MouseEvent('click');

	console.log('click da video', clickEvent);
	document.getElementById('featured-video__player').dispatchEvent(clickEvent);
};
