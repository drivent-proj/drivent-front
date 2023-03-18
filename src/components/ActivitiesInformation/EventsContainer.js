import styled from 'styled-components';
import EventCard from './EventCard';

export default function EventsContainer({ localActivities, selectDay }) {
  return (
    <Container>
      {localActivities.map((activity) => {
        return <EventCard activity={activity} selectDay={selectDay} />;
      })}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  border: 1px solid #d7d7d7;
  border-right: 0.5px solid #d7d7d7;
  border-left: 0.5px solid #d7d7d7;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;
