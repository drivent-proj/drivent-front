import styled from 'styled-components';
import BoxAvailableHotels from './BoxAvailableHotels';

export default function ContainerHotelPage() {
  return (
    <Container>
      <BoxAvailableHotels title='Primeiro, escolha seu hotel'></BoxAvailableHotels>
    </Container>
  );
};

const Container = styled.div`
    height: 100%;
    width: 100%;
    gap: 20px;
`;

