import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import useHotelsWithRoom from '../../hooks/api/useHotelWithRooms';
import useHotelCapacity from '../../hooks/useHotelCapacity';

export default function HotelCard({ hotel, active, setSelected, setHotelRooms }) {
  const [rooms, setRooms] = useState({});
  const hotels = useHotelsWithRoom(hotel.id);
  useEffect(() => {
    if (hotels.hotels) {
      setRooms(useHotelCapacity(hotels.hotels.Rooms));
    }
  }, [hotels.hotelsLoading]);
  return(
    <Hotel 
      onClick={() => {
        setSelected(hotel.id);
        setHotelRooms(hotels.hotels.Rooms);
      }}
      active={active}>
      {hotels.hotels && 
      <>
        <img src={hotels.hotels.image} alt={hotels.hotels.name}></img>
        <HotelName>{hotels.hotels.name}</HotelName>
        {rooms?.type && 
        <>
          <Title>Tipos de acomodação:</Title>
          <Info>{rooms.type}</Info>
          <Title>Vagas disponíveis:</Title>
          <Info>{`${rooms.vacancy}`}</Info>
        </>}
      </>
      }
    </Hotel>
  );
}

const Hotel = styled.div`
  height: 264px;
  width: 196px;
  background-color: ${(props) => props.active ? '#FFEED2' : '#EBEBEB'};
  margin-right: 20px;
  border-radius: 10px;
  padding: 14px;
  img{
    height: 109px;
    width: 168px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
`;

const HotelName = styled.p`
  font-family: Roboto;
  font-size: 20px;
  color: #343434;
`;

const Title = styled.p`
  font-family: Roboto;
  font-weight: 700;
  font-size: 12px;
  color: #3C3C3C;
  margin-top: 16px;
`;

const Info = styled(Title)`
  font-weight: 400;
  margin-top: 4px;
`;
