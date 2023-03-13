import { useState } from 'react';
import styled from 'styled-components';
import BoxAvailableHotels from './BoxAvailableHotels';
import BoxAvailableRooms from './BoxAvailableRooms';
import useChangeBooking from '../../hooks/api/useChangeBooking';
import useBookingRoom from '../../hooks/api/useBookingRoom';
import { toast } from 'react-toastify';


export default function ContainerHotelPage({changing, setChanging}) {
  const [selected, setSelected] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [hotelRooms, setHotelRooms] = useState([]);

  const { bookingUpdateLoading, updateBooking } = useChangeBooking();
  const { bookingLoading, createBooking } = useBookingRoom();


  async function bookingRoom() {
    try {
      await createBooking({ roomId: selectedRoom });
      toast('Reserva feita com sucesso!');
    } catch (err) {
      toast('Não foi possível realizar a reserva!');
    }
  }

  async function changeBooking() {
    try {
      await updateBooking({ roomId: selectedRoom });
      toast('Reserva alterada com sucesso!');
      setChanging(false)
    } catch (err) {
      console.log(err)
      toast('Não foi possível alterar a reserva!');
    }
  }

  return (
    <Container>
      <BoxAvailableHotels
        title="Primeiro, escolha seu hotel"
        selected={selected}
        setSelected={setSelected}
        setHotelRooms={setHotelRooms}
        setSelectedRoom={setSelectedRoom}
      ></BoxAvailableHotels>
      {Object.keys(hotelRooms).length !== 0 && (
        <BoxAvailableRooms
          title="Ótima pedida! Agora escolha seu quarto:"
          hotelRooms={hotelRooms}
          setSelectedRoom={setSelectedRoom}
          selectedRoom={selectedRoom}
        ></BoxAvailableRooms>
      )}

      {selectedRoom && (
        <Button
          onClick={() => {
            changing? changeBooking() : bookingRoom();
          }}
          disabled={bookingLoading}
        >
          RESERVAR QUARTO
        </Button>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  gap: 20px;
`;

const Button = styled.button`
  margin-top: 35px;
  padding: 10px;
  background-color: #e0e0e0;
  border: none;
  box-shadow: 0px 2px 10px 0px #00000040;
  cursor: pointer;
`;
