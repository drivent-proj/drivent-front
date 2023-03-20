import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import useTicket from '../../hooks/api/useTicket';
import ContainerActivies from './ContainerActivities';
import Warning from './Warning';
import { useEffect, useState } from 'react';

export default function ActivitiesInformation() {
  const [isonline, setIsOnline] = useState(false);
  const [status, setStatus] = useState('');
  const ticket = useTicket();

  useEffect(() => {
    if (ticket?.ticket) {
      setIsOnline(ticket.ticket.TicketType.isRemote);
      setStatus(ticket.ticket.status);
    }
  }, [ticket.ticketLoading]);
  const OnlineOrNotPaid = isonline || status !== 'PAID';
  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      {OnlineOrNotPaid && <Warning isonline={isonline} status={status}></Warning>}
      {!OnlineOrNotPaid && <ContainerActivies />}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 36px !important;
`;
