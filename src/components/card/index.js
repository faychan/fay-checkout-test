import React from "react";
import styled from "styled-components";

const Card = styled.div`
    background-color: #FFF;
    border-radius: 4px;
    margin: 55px 50px; 
    max-width: 100%;
    padding: 30px 20px 20px 40px;
`;

const CardContainer = ({...rest}) => (
    <Card {...rest}/>
);

export default CardContainer;
