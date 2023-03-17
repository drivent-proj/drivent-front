import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import useAllBookings from '../../hooks/api/useAllBookings';
import useHotelsWithRoom from '../../hooks/api/useHotelWithRooms';
import useHotelCapacity from '../../hooks/useHotelCapacity';

export default function HotelCard({ hotel, active, setSelected, setHotelRooms, setSelectedRoom }) {
  const [rooms, setRooms] = useState({});
  const [bookingCount, setBookingCount] = useState([]);
  const [vacancyCount, setVacancyCount] = useState(0);
  const hotels = useHotelsWithRoom(hotel.id);
  const allBookings = useAllBookings(hotel.id);

  useEffect(() => {
    if (hotels.hotels) {
      setRooms(useHotelCapacity(hotels.hotels.Rooms));
      setBookingCount(allBookings.allBookings);
    }
    if(rooms.vacancy && bookingCount) setVacancyCount(rooms.vacancy-bookingCount.length);
  }, [hotels.hotelsLoading, allBookings.getAllBookingLoading, bookingCount]);
  return (
    <Hotel
      onClick={() => {
        setSelected(hotel.id);
        setHotelRooms(hotels.hotels.Rooms);
        setSelectedRoom();
      }}
      active={active}
    >
      {hotels.hotels && (
        <>
          <img src={hotels.hotels.image} alt={hotels.hotels.name}></img>
          <HotelName>{hotels.hotels.name}</HotelName>
          {rooms?.type && (
            <>
              <Title>Tipos de acomodação:</Title>
              <Info>{rooms.type}</Info>
              <Title>Vagas disponíveis:</Title>
              <Info>{`${vacancyCount}`}</Info>
            </>
          )}
        </>
      )}
    </Hotel>
  );
}

const Hotel = styled.div`
  height: 264px;
  width: 196px;
  background-color: ${(props) => (props.active ? '#FFEED2' : '#EBEBEB')};
  margin-right: 20px;
  border-radius: 10px;
  padding: 14px;
  img {
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
  color: #3c3c3c;
  margin-top: 16px;
`;

const Info = styled(Title)`
  font-weight: 400;
  margin-top: 4px;
`;
