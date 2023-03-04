import { useEffect, useState } from 'react';
import useEnrollment from '../../hooks/api/useEnrollment';
import useTicket from '../../hooks/api/useTicket';
import useTicketTypes from '../../hooks/api/useTicketType';

import ContainerModality from './ContainerModality';
import { FormWrapper } from './FormWrapper';

import { hotels } from './hotelList';
import PaymentSection from './PaymentSection';

export function SectionTicket() {
  const [isRemote, setIsRemote] = useState(true);
  const [hasTicket, setHasTicket] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  
  const [ticketId, setTicketId] = useState();

  const[typesTicket, setTypesTicket] = useState([]);

  const enrollment = useEnrollment();
  const ticket = useTicket();
  const ticketTypes = useTicketTypes();

  useEffect(() => {
    if (ticket?.ticket) setHasTicket(true);
    if (ticket?.ticket?.status === 'PAID') setIsPaid(true);
  }, [ticket.ticketLoading, enrollment.enrollmentLoading]);

  useEffect(() => {
    if(ticketTypes?.ticketTypes) {
      const ticketWithoutHotel = ticketTypes.ticketTypes.filter((t) => t.includesHotel === false);
      setTypesTicket(ticketWithoutHotel);
      const ticketsNotRemote = ticketTypes.ticketTypes.filter((t) => t.isRemote === false);
    
      hotels.forEach((h) => {
        ticketsNotRemote.forEach((t) => {
          if (t.includesHotel === h.includesHotel) {
            h.id = t.id;
          }
        });
      });
    }
  }, [ticketTypes.ticketTypes]);

  if(ticketTypes.ticketTypeLoading) return 'Carregando...';

  function handleSetRemote(remote) {
    remote ? setIsRemote(true) : setIsRemote(false);
  }

  function selectTicketId(id) {
    setTicketId(id);
  }

  //use ticketId to create new Ticket

  return (
    <FormWrapper>
      {!hasTicket && (
        <>
          <ContainerModality
            title={'Primeiro, escolha sua modalidade de ingresso'}
            type="ticket"
            modalities={typesTicket}
            handleSetRemote={handleSetRemote}
            selectTicketId={selectTicketId}
          />
          {!isRemote && (
            <ContainerModality
              title={'Ótimo! Agora escolha sua modalidade de hospedagem'}
              type="hotel"
              modalities={hotels}
              selectTicketId={selectTicketId}
            />
          )}
        </>
      )}
      {hasTicket && <PaymentSection isPaid={isPaid} setIsPaid={setIsPaid} ticket={ticket.ticket} />}
    </FormWrapper>
  );
}
