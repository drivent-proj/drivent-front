import { useState } from 'react';
import styled from 'styled-components';
import useHotels from '../../hooks/api/useHotels';
import HotelCard from './HotelCards';

export default function BoxAvailableHotels({ title, selected, setSelected, setHotelRooms, setSelectedRoom }) {
  const hotels = useHotels();
  return (
    <>
      <Subtitle>{title}</Subtitle>
      <BoxHotelCards>
        {hotels.hotels &&
          hotels.hotels.map((h) => (
            <HotelCard
              hotel={h}
              active={selected === h.id}
              setSelected={setSelected}
              setHotelRooms={setHotelRooms}
              setSelectedRoom={setSelectedRoom}
            ></HotelCard>
          ))}
      </BoxHotelCards>
    </>
  );
}

const Subtitle = styled.p`
  font-family: Roboto;
  font-size: 20px;
  color: #8e8e8e;
  margin-bottom: 18px;
`;

const BoxHotelCards = styled.div`
  height: 264px;
  width: 100%;
  display: flex;
  overflow-x: auto;
  margin-bottom: 53px;
`;
