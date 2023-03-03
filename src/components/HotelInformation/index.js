import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useTicket from '../../hooks/api/useTicket';
import Warning from './Warning';

export default function HotelInformation() {
  const [includesHotel, setIncludesHotel] = useState(false);
  const [status, setStatus] = useState('');
  const ticket = useTicket();
  useEffect(() => {
    if (ticket?.ticket) {
      setIncludesHotel(ticket.ticket.TicketType.includesHotel);
      setStatus(ticket.ticket.status);
    }
  }, [ticket.ticketLoading]);
  return(
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {(!includesHotel || status!=='PAID') ? 
        <Warning includesHotel={includesHotel} status={status}></Warning>
        :
        <div>OI</div>
      }
    </>
  );
};

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
