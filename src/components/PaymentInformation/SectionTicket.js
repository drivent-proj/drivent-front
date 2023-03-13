import { useEffect, useState } from 'react';
import useEnrollment from '../../hooks/api/useEnrollment';
import useTicket from '../../hooks/api/useTicket';
import useTicketTypes from '../../hooks/api/useTicketType';
import { saveTicket } from '../../services/ticketApi';
import useToken from '../../hooks/useToken';
import ContainerModality from './ContainerModality';
import ReserveContainer from './ReserveContainer';
import { FormWrapper } from './FormWrapper';
import { hotels } from './hotelList';
import PaymentSection from './PaymentSection';

export function SectionTicket() {
  const [isRemote, setIsRemote] = useState(true);
  const [hasTicket, setHasTicket] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const [ticketId, setTicketId] = useState();
  const [total, SetTotal] = useState('');
  const [finished, setFinished] = useState(false);
  const [typesTicket, setTypesTicket] = useState([]);
  const [newTicket, setNewTicket] = useState();
  const enrollment = useEnrollment();
  let ticket = useTicket();
  const ticketTypes = useTicketTypes();
  const token = useToken();

  useEffect(() => {
    if (ticket?.ticket) setHasTicket(true);
    if (ticket?.ticket?.status === 'PAID') setIsPaid(true);
  }, [ticket.ticketLoading, enrollment.enrollmentLoading]);

  useEffect(() => {
    if (ticketTypes?.ticketTypes) {
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

  if (ticketTypes.ticketTypeLoading) return 'Carregando...';

  function handleSetRemote(remote) {
    remote ? setIsRemote(true) : setIsRemote(false);
  }

  function selectTicketId(id, finished) {
    setTicketId(id);
    getPrice(id);
    setFinished(finished);
  }

  function getPrice(id) {
    let total = ticketTypes.ticketTypes.filter((m) => m.id == id)[0].price;
    SetTotal(total);
  }

  //use ticketId to create new Ticket

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let newtick = await saveTicket({ ticketTypeId: ticketId }, token);
      setNewTicket(newtick);
      setHasTicket(true);
    } catch (err) {}
  }

  const ticketWithHotel = ticketTypes.ticketTypes.filter((t) => t.isRemote === false && t.includesHotel === true);
  const ticketWithoutHotel = ticketTypes.ticketTypes.filter((t) => t.isRemote === false && t.includesHotel === false);
  hotels[1].price = ticketWithHotel[0].price - ticketWithoutHotel[0].price;

  return (
    <FormWrapper onSubmit={handleSubmit}>
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

          {finished && <ReserveContainer title={`Fechado! O total ficou em R$ ${total} Agora é só confirmar:`} />}
        </>
      )}

      {hasTicket && <PaymentSection isPaid={isPaid} setIsPaid={setIsPaid} ticket={ticket.ticket || newTicket} />}
    </FormWrapper>
  );
}
