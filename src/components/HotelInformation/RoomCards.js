import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsPerson, BsFillPersonFill } from 'react-icons/bs';

export default function RoomCard({ room, isSelected, setSelectedRoom }) {
  const [arrayIcons, setArrayIcons] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let arrIcons = [];
    let bookings = room.Booking.length;
    let roomsAvailable = room.capacity - bookings;

    if (roomsAvailable === 0) {
      setDisabled(true);
    }

    for (let i = 1; i <= roomsAvailable; i++) {
      if (i === roomsAvailable && isSelected) {
        arrIcons.push(<BsFillPersonFill color={'#FF4791'} />);
      } else {
        arrIcons.push(<BsPerson />);
      }
    }

    for (let i = 0; i < bookings; i++) {
      arrIcons.push(<BsFillPersonFill />);
    }

    setArrayIcons([...arrIcons]);
  }, [room, isSelected]);

  function selectRoom() {
    if (disabled) return;
    setSelectedRoom(room.id);
  }

  return (
    <Room
      onClick={() => {
        selectRoom();
      }}
      selected={isSelected}
      disabled={disabled}
    >
      <p>{room.name}</p>
      <BoxIcons>{arrayIcons.map((icon) => icon)}</BoxIcons>
    </Room>
  );
}

const Room = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  width: 190px;
  height: 45px;
  border: 1px solid #cecece;
  border-radius: 10px;
  margin-right: 17px;
  margin-bottom: 8px;

  background-color: ${(props) => (props.disabled ? '#CECECE' : '')};
  background-color: ${(props) => (props.selected ? '#FFEED2' : '')};

  svg {
    font-size: 24px;
    color: ${(props) => (props.disabled ? '#8C8C8C' : '')};
  }
`;

const BoxIcons = styled.div`
  display: flex;
  gap: 3px;
`;
