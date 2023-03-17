import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useHotelsWithRoom from '../../hooks/api/useHotelWithRooms';

export default function InfoBookedRoom({ selectedHotel, setChanging, booking, hotelRooms, setSelectedHotel }) {
  const [hotel, setHotel] = useState({
    image: 'loading',
    name: 'loading',
  });
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState({
    Booking: [],
  });
  const [bookings, setBookings] = useState(1);
  const hotels = useHotelsWithRoom(booking.Room.hotelId);

  useEffect(() => {
    if (!selectedHotel) {
      if (hotels.hotels) {
        setHotel(hotels.hotels);
        setRooms(hotels.hotels.Rooms);
        setLoading(false);
      }
    } else {
      setHotel(selectedHotel);
      setRooms(hotelRooms);
      setLoading(false);
    }
  }, [hotels.hotelsLoading]);

  useEffect(() => {
    if (!loading) {
      const room = rooms.filter((r) => r.id === booking.Room.id);
      setBookings(room[0].Booking.length);
    }
  }, []);

  return (
    <>
      <Subtitle>Você já escolheu seu quarto:</Subtitle>
      {!loading && (
        <>
          <HotelConfirmationCard>
            <img src={hotel.image} alt={hotel.name}></img>
            <h2>{hotel.name}</h2>
            <div>
              <h3>Quarto Reservado</h3>
              <p>{booking.Room.name}</p>
            </div>
            <div>
              <h3>Pessoas no seu quarto</h3>
              <p>{bookings === 1 ? 'Somente você!' : `Você e mais ${bookings - 1}`}</p>
            </div>
          </HotelConfirmationCard>
          <Button
            onClick={() => {
              setChanging(true);
              setSelectedHotel(undefined);
            }}
          >
            TROCAR DE QUARTO
          </Button>
        </>
      )}
    </>
  );
}

const Subtitle = styled.h1`
  font-family: Roboto;
  font-size: 20px;
  color: #8e8e8e;
`;

const HotelConfirmationCard = styled.div`
  margin-top: 20px;
  background-color: #ffeed2;
  width: 180px;
  height: 240px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 10px;

  h2 {
    width: 100%;
    margin-left: 10px;
    font-size: 14px;
    font-weight: 200;
  }

  h3 {
    font-weight: 700;
    margin-bottom: 5px;
  }

  img {
    max-width: 150px;
    max-height: 100px;
    border-radius: 5px;
  }

  div {
    width: 100%;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
  }
`;

const Button = styled.button`
  margin-top: 35px;
  padding: 10px;
  background-color: #e0e0e0;
  border: none;
  box-shadow: 0px 2px 10px 0px #00000040;
  cursor: pointer;
`;
