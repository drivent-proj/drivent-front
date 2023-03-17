import styled from 'styled-components';

export default function ReserveContainer({ title, modalities, handleSetRemote, type, selectTicketId }) {
  return (
    <Container>
      <Subtitle>{title}</Subtitle>

      <ReserveButton type="submit"> RESERVAR INGRESSO </ReserveButton>
    </Container>
  );
}

const ReserveButton = styled.button`
  width: 162px;
  height: 37px;
  border-radius: 4px;
  background-color: #e0e0e0;
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
