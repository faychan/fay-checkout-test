import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const Header = styled.h2`
  font-size: ${props => (props.as === "h2" ? "36px" : props.as === "h4" ? "24px" : "16px")};
  padding: 0;
  font-weight: 700;
  color: #FF8A00;
  font-family: 'Montserrat', sans-serif;
`;

const Heading = ({label, boxStyle, as, ...props}) => (
  <Wrapper style={{...boxStyle}}>
    <Header as={as} {...props}>{label}</Header>
  </Wrapper>
);

export default Heading;
