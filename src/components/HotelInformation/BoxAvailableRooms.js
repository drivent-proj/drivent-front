import styled from 'styled-components';
import RoomCard from './RoomCards';

export default function BoxAvailableRooms({ title, hotelRooms }) {
  console.log(hotelRooms);
  return(
    <>
      <Subtitle>{title}</Subtitle>
      <Box>
        {hotelRooms.length!== 0 && hotelRooms.map( room => <RoomCard room={room}></RoomCard>)}
      </Box>
    </>
  );
}

const Subtitle = styled.p`
  font-family: Roboto;
  font-size: 20px;
  color: #8e8e8e;
  margin-bottom: 35px;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
`;
