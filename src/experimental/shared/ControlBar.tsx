import styled from 'styled-components';

const ControlBarWrapper = styled.div`
	/*	position: relative;
	background: rgba(0, 0, 0, 0.5);
	bottom: 34px;
	z-index: 2;
	background-color: gray;
	max-height: 140px;

	display: flex;*/

	align-items: center;
	background-color: rgba(255, 255, 255, 0.9);
	border-radius: 2px;
	cursor: pointer;
	width: 100%;
	padding: 5px 8px;
	position: absolute;
	bottom: 0px;
	left: 0px;
	max-height: 140px;
	box-sizing: border-box;
	z-index: 3;

	display: flex;
	flex-direction: column;
`;

export default ControlBarWrapper;
