import { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

export default function ReserveContainer({ title, modalities, handleSetRemote, type, selectTicketId }) {
  const [active, setActive] = useState('');

  return (
    <Container>
      <Subtitle>{title}</Subtitle>
            
      <ReserveButton type="submit" > RESERVAR INGRESSO </ReserveButton>
            
    </Container>
  );
}

const ReserveButton = styled.button`
    width: 162px;
    height: 37px;
    border-radius: 4px;
    background-color: #E0E0E0;
    font-family: Roboto;
    font-size: 12px;
    color: #000000;
    text-align: center;
    font-weight: 400;

`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Subtitle = styled.h1`
  font-family: Roboto;
  font-size: 20px;
  color: #8e8e8e;
`;

const ContainerModalities = styled.div`
  display: flex;
  gap: 20px;
`;
