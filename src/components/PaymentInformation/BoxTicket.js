import { Container } from './BoxModality';

export default function BoxModality({ modality, active, setActive, handleSetRemote }) {
  return (
    <Container
      active={active}
      onClick={() => {
        setActive(modality.name);
        handleSetRemote(modality.isRemote);
      }}
    >
      <p className="type">{modality.name}</p>
      <p className="price">R$ {modality.price}</p>
    </Container>
  );
}
