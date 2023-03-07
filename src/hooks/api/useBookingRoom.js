import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useBookingRoom() {
  const token = useToken();
  const {
    loading: bookingLoading,
    error: bookingError,
    act: createBooking,
  } = useAsync((data) => bookingApi.createBooking(data, token), false);

  return {
    bookingLoading,
    bookingError,
    createBooking,
  };
}
