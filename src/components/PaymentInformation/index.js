import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import useTicketTypes from '../../hooks/api/useTicketType';
import ContainerModality from './ContainerModality';
import { FormWrapper } from './FormWrapper';

import { hotels } from './hotelList';

export default function PaymentInformation() {
  const [isRemote, setIsRemote] = useState(true);

  const ticketTypes = useTicketTypes();

  if (ticketTypes.ticketTypeLoading) return 'Carregando...';

  function handleSetRemote(remote) {
    remote ? setIsRemote(true) : setIsRemote(false);
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <FormWrapper>
        <ContainerModality
          title={'Primeiro, escolha sua modalidade de ingresso'}
          type="ticket"
          modalities={ticketTypes.ticketTypes}
          handleSetRemote={handleSetRemote}
        />
        {!isRemote && (
          <ContainerModality
            title={'Ótimo! Agora escolha sua modalidade de hospedagem'}
            type="hotel"
            modalities={hotels}
          />
        )}
      </FormWrapper>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
