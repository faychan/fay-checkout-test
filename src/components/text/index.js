import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const Text = styled.div`
  font-size: 14px;
  padding: 0;
  font-weight: 400;
  color: #979797;
  font-family: 'Helvetica', sans-serif;
  &.on-desktop-space {
    margin-bottom: 200px;
  }
`;

const TextContainer = ({label, boxStyle, as, ...props}) => (
  <Wrapper style={{boxStyle}}>
    <Text {...props}>{label}</Text>
  </Wrapper>
);

export default TextContainer;
