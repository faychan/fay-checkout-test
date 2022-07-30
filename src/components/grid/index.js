import styled from "styled-components";

export const GridContainer = styled.div`
	display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

export const GridItem = styled.div`
  position: relative;
`;

export const GridContainerSize2  = styled.div`
	display: grid;
	grid-template-columns: 66% 33%;
	gap: 24px;
`;