import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useEnrollment from '../../hooks/api/useEnrollment';
import useTicket from '../../hooks/api/useTicket';
import useTicketTypes from '../../hooks/api/useTicketType';

import NoEnrollmentWarning from './NoEnrollmentWarning';
import { SectionTicket } from './SectionTicket';

export default function PaymentInformation() {
  const [hasEnrollment, setHasEnrollment] = useState(false);

  const enrollment = useEnrollment();

  useEffect(() => {
    if (enrollment?.enrollment) setHasEnrollment(true);
  }, [enrollment.enrollmentLoading]);

  if (enrollment.enrollmentLoading) return 'Carregando...';

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {hasEnrollment ? (
        <SectionTicket/>
      ) : (
        <NoEnrollmentWarning />
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  width: 100% !important;
`;
