import useAsync from '../useAsync';
import useToken from '../useToken';

import * as localsApi from '../../services/localsApi';

export default function useLocals() {
  const token = useToken();

  const {
    data: locals,
    loading: localsLoading,
    error: localsError,
    act: getLocals,
  } = useAsync(() => localsApi.getLocals(token));

  return {
    locals,
    localsLoading,
    localsError,
    getLocals,
  };
}
