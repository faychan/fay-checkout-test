import styled from "styled-components";


const Label = styled.span`
font-size: 30px;
font-weight: normal;
position: absolute;
pointer-events: none;
right: 8px;
bottom: calc(50% - 18px);
transition: 0.2s ease all;
font-family: 'Material Symbols Outlined';
color: ${props => (props.error ? "#FF8A00" : !props.error ? "#1BD97B" : "")};
`;

const LabelValid = ({ ...props}) => (
  <Label {...props} />
);

export default LabelValid;
