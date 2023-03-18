import { CgEnter } from 'react-icons/cg';
import styled from 'styled-components';

export default function PlacesContainer() {
  return (
    <Container>
      <CgEnter size={30} color={'#078632'} />
      <p>27 vagas</p>
    </Container>
  );
}

const Container = styled.div`
  width: 30%;
  height: 100%;
  border-left: 1px solid #cfcfcf;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin-top: 4px;
    font-size: 12px;
    color: #078632;
  }
`;
