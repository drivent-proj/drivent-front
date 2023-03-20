import { CgCloseO, CgEnter, CgCheckO } from 'react-icons/cg';
import styled from 'styled-components';
import useEnrollment from '../../hooks/api/useEnrollment';
import useActivityCapacity from '../../hooks/useActivityCapacity';
import { useEffect, useState } from 'react';
import useRegisterinActivity from '../../hooks/api/useRegisterinActivity';
import { toast } from 'react-toastify';

export default function PlacesContainer({ maxCapacity, subscribes, users, id, selectDay }) {
  const capacity = useActivityCapacity(maxCapacity, subscribes);
  const enrollment = useEnrollment();
  const [subscribers, setSubscribers] = useState(users);
  const [isRegistered, setIsRegistered] = useState(users.map((user) => {user.enrollmentId === enrollment.id}));
  const [registed, setRegisted] = useState(isRegistered.length >=1);
  const { RegisterinActivity, activityLoading } = useRegisterinActivity();

  useEffect(() => {
    setSubscribers(users);
    setIsRegistered(users.map( (user) => {user.enrollmentId == enrollment.id}));
    setRegisted(isRegistered.length >=1);
  }, [ selectDay, users, subscribers]);
  
  async function Subscribe(id) {
    if(confirm('Deseja se inscrever na atividade?')) {
      try{
        const response = await RegisterinActivity({ activityId: id });
        toast('Inscrição feita com sucesso!');
        setRegisted(!registed);
      } catch(err) {
        console.log(err);
        toast('Horário conflitante com outra atividade. Inscrição não feita!');
      }
    }}
  
  return (
    <Container capacity={capacity || (isRegistered.length >= 1) }>
      {registed ? <CgCheckO size= {30} color = {'#078632'}/> : (capacity? <CgEnter cursor={'pointer'} size={30} color={'#078632'} onClick= {() => Subscribe(id)}/> : <CgCloseO size={25} color={'#CC6666'} />) }
      <p>{((registed) ? 'Inscrito': (capacity) ? (capacity!==1) ? `${capacity} vagas` : '1 vaga' : 'Esgotado')}</p>
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
