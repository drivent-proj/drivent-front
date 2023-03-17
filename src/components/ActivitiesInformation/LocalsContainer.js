import styled from 'styled-components';
import useLocals from '../../hooks/api/useLocals';
import EventsContainer from './EventsContainer';

export default function LocalsContainer({ dayActivities, selectDay }) {
  const { locals, localsLoading } = useLocals();

  function filterActivities(localId) {
    const filteredActivities = dayActivities.filter((activity) => activity.Local.id === localId);
    return filteredActivities;
  }

  return (
    <Container>
      {!localsLoading &&
        locals.map((local) => {
          return (
            <LocalContainer>
              <h1>{local.name}</h1>
              <EventsContainer localActivities={filterActivities(local.id)} selectDay={selectDay} />
            </LocalContainer>
          );
        })}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 40px;
  height: 420px;
  width: 100%;
  display: flex;
`;

const LocalContainer = styled.div`
  font-family: Roboto;
  width: 288px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 19px;
    margin-bottom: 13px;
    color: #7b7b7b;
  }
`;
