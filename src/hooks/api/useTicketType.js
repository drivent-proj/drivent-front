import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketTypeApi from '../../services/tycketTypeApi';

export default function useTicketTypes() {
  const token = useToken();

  const {
    data: ticketTypes,
    loading: ticketTypeLoading,
    error: ticketTypeError,
    act: getTicketTypes,
  } = useAsync(() => ticketTypeApi.getTicketTypes(token));

  return {
    ticketTypes,
    ticketTypeLoading,
    ticketTypeError,
    getTicketTypes,
  };
}
