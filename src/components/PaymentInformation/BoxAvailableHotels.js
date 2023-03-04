import styled from 'styled-components';
import useHotels from '../../hooks/api/useHotels';
import HotelCard from './HotelCards';

export default function BoxAvailableHotels({ title }) {
  const hotels = useHotels();
  return(
    <>
      <Subtitle>{title}</Subtitle>
      <Box>{hotels.hotels && hotels?.hotels.map(h => <HotelCard hotel={h}></HotelCard>)}</Box>
    </>
  );
}

const Subtitle = styled.p`
  font-family: Roboto;
  font-size: 20px;
  color: #8e8e8e;
  margin-bottom: 18px;
`;

const Box = styled.div`
  height: 264px;
  width: 100%;
  display: flex;
  overflow-x: auto;
`;

