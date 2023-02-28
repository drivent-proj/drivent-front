import { Container } from './BoxModality';

export default function BoxModality({ modality, active, setActive }) {
  return (
    <Container
      active={active}
      onClick={() => {
        setActive(modality.name);
      }}
    >
      <p className="type">{modality.name}</p>
      <p className="price">+ R$ {modality.price}</p>
    </Container>
  );
}
