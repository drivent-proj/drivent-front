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

  const { booking, bookingLoading } = useGetBooking();

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
      {booking ? <InfoBookedRoom /> : <ContainerHotelPage />}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 36px !important;
`;
