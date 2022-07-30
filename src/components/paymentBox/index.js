import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  background-color: ${props => (props.active ? "rgba(27, 217, 123, 0.1)" : "transparent")};
  border: 2px solid ${props => (props.active ? "#1BD97B" : "#CCCCCC")};
  width: 180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
	min-height: 34px;
	padding: 12px 15px;
`;

const PaymentWrapper = styled.div`
  position: relative;
`;

const PaymentName = styled.div`
	font-size: 13px;
	font-weight: 500;
`;

const PaymentPrice = styled.div`
	font-size: 16px;
  font-weight: ${props => (props.active ? 700 : 400)};
  color: #2D2A40;
`;

const PaymentIcon = styled.span`
	font-size: 18px;
	color: #1BD97B;
`;

const PaymentBox = ({name, price, active, boxStyle, as, onClick, ...props}) => (
  <Wrapper onClick={onClick} active={active} {...props}>
		<PaymentWrapper>
			<PaymentName>{name}</PaymentName>
			{
				price ?
					<PaymentPrice active={active}>{price}</PaymentPrice>
				: null
			}
		</PaymentWrapper>
		{
			active ? 
				<PaymentIcon className="material-symbols-outlined">check</PaymentIcon>
			: null
		}
  </Wrapper>
);

export default PaymentBox;
