import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelsApi from '../../services/hotelsApi';

export default function useHotelsWithRoom(ticketId) {
  const token = useToken();

  const {
    data: hotels,
    loading: hotelsLoading,
    error: hotelsError,
    act: getHotelsWithRooms,
  } = useAsync(() => hotelsApi.getHotelsWithRooms(ticketId, token));

  return {
    hotels,
    hotelsLoading,
    hotelsError,
    getHotelsWithRooms,
  };
};
