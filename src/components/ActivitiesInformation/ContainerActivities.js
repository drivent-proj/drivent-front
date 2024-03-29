import { useState } from 'react';
import styled from 'styled-components';
import useActivities from '../../hooks/api/useActivities';
import LocalsContainer from './LocalsContainer';

export default function ContainerActivities() {
  const { activities, activitiesLoading } = useActivities();
  const [selectDay, setSelectDay] = useState();
  const [dayActivities, setDayActivities] = useState();
  const [reload, setReload] = useState(false);

  if (activitiesLoading) return 'Carregando...';
  return (
    <>
      {!selectDay && <Subtitle>Primeiro, filtre pelo dia do evento: </Subtitle>}
      <BoxButton>
        {activities.map((activity) => (
          <Button
            selected={activity.date === selectDay ? true : false}
            onClick={() => {
              setDayActivities(activity.activies); // use to render activies
              setSelectDay(activity.date);

            }}
          >
            {activity.weekday}, {activity.date}
          </Button>
        ))}
      </BoxButton>
      {selectDay && <LocalsContainer dayActivities={dayActivities} selectDay={selectDay} setReload= {setReload}/>}
    </>
  );
}

const Subtitle = styled.p`
  font-family: Roboto;
  font-size: 20px;
  color: #8e8e8e;
  margin-bottom: 8px;
`;

const BoxButton = styled.div`
  display: flex;
  gap: 20px;

  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 25px;
  background: ${(props) => (props.selected ? '#FFD37D' : '#e0e0e0')};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  cursor: pointer;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
`;
