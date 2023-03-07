import { useState } from 'react';
import styled from 'styled-components';
import BoxAvailableHotels from './BoxAvailableHotels';
import BoxAvailableRooms from './BoxAvailableRooms';

export default function ContainerHotelPage() {
  const [selected, setSelected] = useState('');
  const [hotelRooms, setHotelRooms] = useState([]);
  return (
    <Container>
      <BoxAvailableHotels 
        title='Primeiro, escolha seu hotel' 
        selected={selected} 
        setSelected={setSelected}
        setHotelRooms={setHotelRooms}>
      </BoxAvailableHotels>
      {Object.keys(hotelRooms).length !== 0 &&
        <BoxAvailableRooms 
          title='Ótima pedida! Agora escolha seu quarto:' 
          hotelRooms={hotelRooms}>
        </BoxAvailableRooms>}
    </Container>
  );
};

const Container = styled.div`
    height: 100%;
    width: 100%;
    gap: 20px;
`;

