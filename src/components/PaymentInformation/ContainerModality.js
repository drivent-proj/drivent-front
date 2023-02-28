import { useState } from 'react';
import styled from 'styled-components';
import BoxTicket from './BoxTicket';
import BoxHotel from './BoxHotel';

export default function ContainerModality({ title, modalities, handleSetRemote, type }) {
  const [active, setActive] = useState('');

  return (
    <Container>
      <Subtitle>{title}</Subtitle>
      <ContainerModalities>
        {modalities.map((m) =>
          type === 'ticket' ? (
            <BoxTicket
              modality={m}
              active={active === m.name ? true : false}
              setActive={setActive}
              handleSetRemote={handleSetRemote}
            />
          ) : (
            <BoxHotel modality={m} active={active === m.name ? true : false} setActive={setActive} />
          )
        )}
      </ContainerModalities>
    </Container>
  );
}

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
