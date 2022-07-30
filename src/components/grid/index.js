import styled from "styled-components";

export const GridContainer = styled.div`
	display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
	@media (max-width: 1399px) {
		grid-template-columns: 50% 50%;
	}
	@media (max-width: 990px) {
		grid-template-columns: 100%;
	}
`;

export const GridItem = styled.div`
  position: relative;
	&:nth-child(3){
		border-left: 1px solid #FF8A00;
		padding: 0 19px;
	}
	@media (max-width: 1399px) {
		&:nth-child(3){
			border-left: none;
			border-top: 1px solid #FF8A00;
			width: 100%;
			padding: 0;
		}
	}
`;

export const GridContainerSize2  = styled.div`
	display: grid;
	grid-template-columns: 66% 33%;
	gap: 24px;
	@media (max-width: 1399px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (max-width: 990px) {
		grid-template-columns: 100%;
	}
`;