import useToken from "../useToken";
import useAsync from "../useAsync";

import * as bookingApi from '../../services/bookingApi';


export default function useChangeBooking() {
    const token = useToken();
    const {
      loading: bookingLoading,
      error: bookingError,
      act: updateBooking,
    } = useAsync((data) => bookingApi.updateBooking(data, token), false);
  
    return {
      bookingLoading,
      bookingError,
      updateBooking,
    };
  }