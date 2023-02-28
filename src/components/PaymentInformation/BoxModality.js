import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 20px;
  gap: 10px;

  background-color: ${(props) => (props.active ? '#FFEED2' : 'none')};
  border: ${(props) => (props.active ? 'none' : '2px solid #CECECE')};

  .type {
    color: #454545;
  }

  .price {
    color: #898989;
  }
`;
