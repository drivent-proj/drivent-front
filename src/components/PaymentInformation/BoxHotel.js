import { Container } from './BoxModality';

export default function BoxHotel({ modality, active, setActive, selectTicketId }) {
  return (
    <Container
      active={active}
      onClick={() => {
        setActive(modality.name);
        selectTicketId(modality.id);
      }}
    >
      <p className="type">{modality.name}</p>
      <p className="price">+ R$ {modality.price}</p>
    </Container>
  );
}
