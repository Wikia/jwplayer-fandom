import React from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.button`
	width: 132px;
	height: 41px;
	background: rgba(0, 0, 0, 0.5);
	color: #fff;
	border-radius: 2px;
	font-size: 14px;
	font-weight: 500px;
`;

const LearnMoreButton: React.FC = () => {
	return <ButtonStyled>Learn More</ButtonStyled>;
};

export default LearnMoreButton;
