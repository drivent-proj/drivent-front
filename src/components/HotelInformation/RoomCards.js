import styled from 'styled-components';
import { BsPerson, BsFillPersonFill } from '../../../node_modules/react-icons/bs';

export default function RoomCard({ room }) {
  return(
    <Room></Room>
  );
}

const Room = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  width: 190px;
  height: 45px;
  border: 1px solid #CECECE;
  border-radius: 10px;
  margin-right: 17px;
  margin-bottom: 8px;
`;
