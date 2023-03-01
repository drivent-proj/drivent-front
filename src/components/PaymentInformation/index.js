import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useTicket from '../../hooks/api/useTicket';
import useTicketTypes from '../../hooks/api/useTicketType';
import ContainerModality from './ContainerModality';
import { FormWrapper } from './FormWrapper';

import { hotels } from './hotelList';
import PaymentSection from './PaymentSection';

export default function PaymentInformation() {
  const [isRemote, setIsRemote] = useState(true);
  const [hasTicket, setHasTicket] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const ticket = useTicket();
  const ticketTypes = useTicketTypes();

  useEffect(() => {
    if (ticket?.ticket) setHasTicket(true);
    if (ticket?.ticket?.status === 'PAID') setIsPaid(true);
  }, [ticket.ticketLoading]);

  if (ticketTypes.ticketTypeLoading || ticket.ticketLoading) return 'Carregando...';

  function handleSetRemote(remote) {
    remote ? setIsRemote(true) : setIsRemote(false);
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <FormWrapper>
        {!hasTicket && (
          <>
            <ContainerModality
              title={'Primeiro, escolha sua modalidade de ingresso'}
              type="ticket"
              modalities={ticketTypes.ticketTypes}
              handleSetRemote={handleSetRemote}
            />
            {!isRemote && (
              <ContainerModality
                title={'Ótimo! Agora escolha sua modalidade de hospedagem'}
                type="hotel"
                modalities={hotels}
              />
            )}
          </>
        )}
        {hasTicket && <PaymentSection isPaid = {isPaid} setIsPaid = {setIsPaid} ticket={ticket.ticket}/>}
      </FormWrapper>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  width: 100% !important;
`;
