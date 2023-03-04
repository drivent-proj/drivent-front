import { AiFillCheckCircle } from 'react-icons/ai';
import styled from 'styled-components';

export default function PaymentConfirmed() {
  return (
    <PaymentConfirmContainer>
      <AiFillCheckCircle size={50} color={'#2FBB58'} />
      <div>
        <h1>Pagamento confirmado!</h1>
        <p>Prossiga para escolha de hospedagem e atividades</p>
      </div>
    </PaymentConfirmContainer>
  );
}

const PaymentConfirmContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 15px;
    p {
      font-weight: 300;
      color: #898989;
    }
  }
`;
