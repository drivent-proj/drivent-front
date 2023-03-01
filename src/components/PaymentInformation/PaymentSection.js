import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PaymentForm from './CredCardSection';

export default function PaymentSection({ isPaid, setIsPaid, ticket }) {
  const [text, setText] = useState('Carregando...'); 
  useEffect(() => {
    (ticket.TicketType.isRemote === true) ? 
      setText('Online') : 
      ((ticket.TicketType.includesHotel === true) ?
        setText('Presencial + Com Hotel') :
        setText('Presencial'));
  }, [ticket.status]);
  return (
    <>
      <TicketInfo>
        <Subtitle>Ingresso Escolhido</Subtitle>
        <TicketInfoCard>
          <p className="type">{text}</p>
          <p className="price">R$ {ticket.TicketType.price}</p>
        </TicketInfoCard>
      </TicketInfo>
      <Subtitle>Pagamento</Subtitle>
      {isPaid && <>Em Construção</>}
      {!isPaid && <PaymentForm/>}
    </>
  );
};

const TicketInfo = styled.div`
  width: auto;
`;

const Subtitle = styled.h1`
  font-family: Roboto;
  font-size: 20px;
  color: #8e8e8e;
`;

const TicketInfoCard = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FFEED2;
  width: 300px;
  height: 100px;
  border-radius: 20px;
  gap: 10px;

  .type {
    color: #454545;
  }

  .price {
    color: #898989;
  }
`;
