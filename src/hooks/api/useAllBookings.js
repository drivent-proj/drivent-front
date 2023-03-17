import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useAllBookings(roomId) {
  const token = useToken();
  const {
    data: allBookings,
    loading: getAllBookingLoading,
    error: getAllBookingError,
    act: getAllBooking,
  } = useAsync(() => bookingApi.getAllBooking(roomId, token));

  return {
    allBookings,
    getAllBookingLoading,
    getAllBookingError,
    getAllBooking,
  };
};
