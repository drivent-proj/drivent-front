import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import ContainerActivies from './ContainerActivities';

export default function ActivitiesInformation() {
  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <ContainerActivies />
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 36px !important;
`;
