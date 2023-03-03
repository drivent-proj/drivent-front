import { Container } from './BoxModality';

export default function BoxTicket({ modality, active, setActive, handleSetRemote, selectTicketId }) {
  return (
    <Container
      active={active}
      onClick={() => {
        setActive(modality.name);
        handleSetRemote(modality.isRemote);
        selectTicketId(modality.id);
      }}
    >
      <p className="type">{modality.name}</p>
      <p className="price">R$ {modality.price}</p>
    </Container>
  );
}
