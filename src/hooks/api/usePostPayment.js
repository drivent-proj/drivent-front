import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentsApi from '../../services/paymentApi';

export default function usePostPayment() {
  const token = useToken();
  const {
    loading: processPaymentLoading,
    error: processPaymentError,
    act: processPayment,
  } = useAsync((data) => paymentsApi.process(data, token), false);

  return {
    processPaymentLoading,
    processPaymentError,
    processPayment,
  };
}
