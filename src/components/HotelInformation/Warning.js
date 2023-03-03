import styled from 'styled-components';

export default function Warning({ includesHotel, status }) {
  return(
    <StyledAdvice>
      {!includesHotel ? 
        <p>Sua modalidade de ingresso não inclui hospedagem <br/>
        Prossiga para a escolha de atividades</p> : 
        (status!=='PAID') &&
      <p>Você precisa ter confirmado pagamento antes <br/>
      de fazer a escolha de hospedagem</p>}
    </StyledAdvice>
  );
};

const StyledAdvice = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Roboto;
  font-size: 20px;
  color: #8e8e8e;
  text-align: center;
  `;
