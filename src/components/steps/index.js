import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	position: absolute;
	top: -30px;
	left: calc(50% - 290px);
	background-color: #FFFAE6;
	border-radius: 35%;
	display: grid;
	grid-template-columns: repeat(3, minmax(100px, 200px));
	width: 100%;
	height: 70px;
	max-width: 600px;
  color: #FF8A00;
	@media (max-width: 600px) {
		width: calc(100% - 120px);
		left: 88px;
    justify-content: flex-start;
    text-align: left;
    grid-row-gap: 24px;
    border-radius: 0 0 0 35%;
    height: 120px;
    padding-bottom: 48px;
    padding-left: 31px;
		grid-template-columns: 100%;
	}
`;

const StepWrapper = styled.div`
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	@media (max-width: 600px) {
		justify-content: flex-start;
	}
`;

const StepNumber = styled.div`
	background-color: rgba(255, 138, 0, 0.2);
	border-radius: 50%;
	font-size: 19px;
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
	&.active {
		background-color: #FF8A00;
		color: #FFF; 
	}
`;

const StepLabel = styled.div`
  font-size: 19px;
  max-width: 120px;
`;

const Steps = ({active}) => (
  <Wrapper>
    <StepWrapper>
			<StepNumber className={active === 1 ? "active": ""}>1</StepNumber>
			<StepLabel>Delivery</StepLabel>
			<span className="material-symbols-outlined">
				chevron_right
			</span>
    </StepWrapper>
		<StepWrapper>
			<StepNumber className={active === 2 ? "active": ""}>2</StepNumber>
			<StepLabel>Payment</StepLabel>
			<span className="material-symbols-outlined">
				chevron_right
			</span>
    </StepWrapper>
		<StepWrapper>
			<StepNumber className={active === 3 ? "active": ""}>3</StepNumber>
			<StepLabel>Finish</StepLabel>
    </StepWrapper>
  </Wrapper>
);

export default Steps;
