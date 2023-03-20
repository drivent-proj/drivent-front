import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useGetBooking from '../../hooks/api/useGetBooking';
import useTicket from '../../hooks/api/useTicket';
import ContainerHotelPage from './ContainerHotelPage';
import InfoBookedRoom from './InfoBookedRoom';
import Warning from './Warning';

export default function HotelInformation() {
  const [includesHotel, setIncludesHotel] = useState(false);
  const [status, setStatus] = useState('');
  const ticket = useTicket();
  const [changing, setChanging] = useState(false);
  const [booking, setBooking] = useState(undefined);
  const [bookingLoading, setbookingLoading] = useState(undefined);
  const [selectedHotel, setSelectedHotel] = useState(undefined);
  const [hotelRooms, setHotelRooms] = useState([]);

  const bookingHook = useGetBooking();

  useEffect(() => {
    setbookingLoading(bookingHook.bookingLoading);
    if (!bookingHook.bookingLoading) {
      setBooking(bookingHook.booking);
    }
  }, [bookingHook.bookingLoading]);

  useEffect(() => {
    if (ticket?.ticket) {
      setIncludesHotel(ticket.ticket.TicketType.includesHotel);
      setStatus(ticket.ticket.status);
    }
  }, [ticket.ticketLoading, bookingLoading]);

  const notIncludeOrNotPaid = !includesHotel || status !== 'PAID';
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {notIncludeOrNotPaid && <Warning includesHotel={includesHotel} status={status}></Warning>}
      {(booking && !changing && includesHotel && status === 'PAID') &&
        <InfoBookedRoom
          changing={changing}
          setChanging={setChanging}
          booking={booking}
          selectedHotel={selectedHotel}
          hotelRooms={hotelRooms}
          setSelectedHotel={setSelectedHotel}
        />
      }  {((!booking && changing && includesHotel && status === 'PAID') &&
        <ContainerHotelPage
          changing={changing}
          setChanging={setChanging}
          setBooking={setBooking}
          setSelectedHotel={setSelectedHotel}
          setHotelRooms={setHotelRooms}
          hotelRooms={hotelRooms}
        />
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 36px !important;
`;
