import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlacesContainer from './PlacesContainer';

export default function EventCard({ activity, selectDay }) {
  const [height, setHeight] = useState('1px');
  const [start, setStart] = useState('1px');
  const [end, setEnd] = useState('1px');

  useEffect(() => {
    handleDate(activity.startHour, activity.endHour);
  }, [selectDay]);

  function handleDate(start, end) {
    const auxArr1 = start.split('T');
    const auxArr2 = end.split('T');
    const startHour = Number(auxArr1[1].slice(0, 2)) + Number(auxArr1[1].slice(3, 4)) / 60;
    const endHour = Number(auxArr2[1].slice(0, 2)) + Number(auxArr2[1].slice(3, 4)) / 60;
    setHeight(`${(endHour - startHour) * 80}px`);
    setEnd(auxArr2[1].slice(0, 5));
    setStart(auxArr1[1].slice(0, 5));
  }

  return (
    <Card height={height}>
      <CardInfo>
        <h3>{activity.name}</h3>
        <p>
          {start} - {end}
        </p>
      </CardInfo>
      <PlacesContainer />
    </Card>
  );
}

const Card = styled.div`
  width: 93%;
  height: ${(props) => props.height};
  padding: 12px 0;
  background-color: #e0e0e0;
  margin: 7px 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const CardInfo = styled.div`
  width: 70%;
  padding: 0 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  h3 {
    font-size: 12px;
    font-weight: 700;
    color: #343434;
    font-family: 'roboto';
    margin-bottom: 5px;
  }
  p {
    font-size: 13px;
    font-weight: 400;
  }
`;
