import { CgCloseO, CgEnter } from 'react-icons/cg';
import styled from 'styled-components';
import useActivityCapacity from '../../hooks/useActivityCapacity';

export default function PlacesContainer({ maxCapacity, subscribes }) {
  const capacity = useActivityCapacity(maxCapacity, subscribes);
  return (
    <Container capacity={capacity}>
      {capacity ? <CgEnter size={30} color={'#078632'} /> : <CgCloseO size={25} color={'#CC6666'} />}
      <p>{(capacity) ? (capacity!==1) ? `${capacity} vagas` : '1 vaga' : 'Esgotado'}</p>
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
    margin-top: 6px;
    font-size: 12px;
    color: ${ props => props.capacity ? '#078632' : '#CC6666'};
  }
`;
