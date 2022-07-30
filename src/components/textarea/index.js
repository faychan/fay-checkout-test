import React from "react";
import styled from "styled-components";
import LabelValid from "../labelValid";

const Wrapper = styled.div`
  position: relative;
	width: fit-content;
	height: fit-content;
`;

const TextArea = styled.textarea`
	position: relative;
  font-size: 18px;
  padding: 24px 12px 8px 15px;
  display: block;
  width: 400px;
  height: 120px;
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
	${TextArea}.error ~ & {
		top: 12px;
    font-size: 13px;
		color: #FF8A00;
	}
  ${TextArea}:focus ~ &,
  ${TextArea}.filled ~ & {
		top: 12px;
    font-size: 13px;
    color: #1BD97B!important;
  }
`;

const LabelCounter = styled.div`
  color: #999;
  font-size: 13px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  right: 8px;
  bottom: 8px;
  transition: 0.2s ease all;
  font-family: 'Helvetica', sans-serif;
	${TextArea}.error ~ & {
    font-size: 13px;
		color: #FF8A00;
	}
  ${TextArea}:focus ~ &,
  ${TextArea}.filled ~ & {
    font-size: 13px;
    color: #1BD97B!important;
  }
`;

const ContainedTextArea = ({label, value, onChange, onBlur, inputRef, error, disabled, name}) => (
  <Wrapper>
    <TextArea className={error ? "error" : value?.length > 0 ? "filled" : ""} name={name} disabled={disabled} value={value} onChange={onChange} onBlur={onBlur} inputRef={inputRef} error={error}/>
    <Label>{label}</Label>
    <LabelCounter>{value?.length}</LabelCounter>
		<LabelValid error={error}>
			{error ? "clear" : !error && value?.length > 0 ? "check" : ""}
		</LabelValid>
  </Wrapper>
);

export default ContainedTextArea;
