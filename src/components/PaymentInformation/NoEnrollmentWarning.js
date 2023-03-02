import styled from 'styled-components';

export default function NoEnrollmentWarning() {
  return (
    <StyledAdvice>
      <p>Você precisa completar sua inscrição antes <br/> de prosseguir pra escolha de ingresso</p>
    </StyledAdvice>
  );
}

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
