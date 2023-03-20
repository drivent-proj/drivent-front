import useAsync from '../useAsync';
import useToken from '../useToken';

import * as registerinActivityApi from '../../services/registerinActivityApi.js';

export default function useRegisterinActivity() {
  const token = useToken();
  const {
    loading: activityLoading,
    error: activityError,
    act: RegisterinActivity,
  } = useAsync((data) => registerinActivityApi.RegisterinActivity(data, token), false);

  return {
    activityLoading,
    activityError,
    RegisterinActivity,
  };
}
