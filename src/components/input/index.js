import styled from "styled-components";
import LabelValid from "../labelValid";

const Wrapper = styled.div`
  position: relative;
	width: fit-content;
	height: fit-content;
`;

const Input = styled.input`
  font-size: 18px;
  padding: 24px 12px 8px 15px;
  display: block;
  width: 300px;
  height: 32px;
  border: 1px solid #757575;
  outline: none;
  font-family: 'Helvetica', sans-serif;
	margin-bottom: 10px;
  &.error {
		border-color: #FF8A00;
		font-size: 15px;
	}
	&:focus,
	&.filled {
		border-color: #1BD97B;
		font-size: 15px;
	}
	@media (max-width: 600px) {
		width: 174px;
	}
`;

const Label = styled.label`
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 15px;
  top: 22px;
  transition: 0.2s ease all;
  font-family: 'Helvetica', sans-serif;
	${Input}.error ~ & {
		top: 12px;
    font-size: 13px;
		color: #FF8A00;
	}
  ${Input}:focus ~ &,
  ${Input}.filled ~ & {
		top: 12px;
    font-size: 13px;
    color: #1BD97B!important;
  }
`;

const ContainedInput = ({label, value, onChange, onBlur, inputRef, error, disabled, name, ...props}) => (
  <Wrapper>
    <Input type={props.type} className={error ? "error" : value?.length > 0 ? "filled" : ""} name={name} disabled={disabled} value={value} onChange={onChange} onBlur={onBlur} inputRef={inputRef} error={error}/>
    <Label>{label}</Label>
    <LabelValid error={error}>
			{error ? "clear" : !error && value?.length > 0 ? "check" : ""}
		</LabelValid>
  </Wrapper>
);

export default ContainedInput;
