import styled from 'styled-components';

export default function Warning({ isonline, status }) {
  return(
    <StyledAdvice>
      {status!=='PAID' ?  
        <p>Você precisa ter confirmado pagamento antes <br/>
          de fazer a escolha de atividades</p>
        :  (isonline ?
          <p>Sua modalidade de ingresso não necessita escolher <br/>
          atividade. Você terá acesso a todas as atividades.</p> : '' )
        
          }
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
