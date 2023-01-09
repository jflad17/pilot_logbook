import axios from 'axios';
import { useQuery,
  // useMutation
} from 'react-query';
// import queryClient from '@services/queryClient';
// import { toast } from 'react-toastify';

export const useReport = (params) => {
  return useQuery(['report', params], () => axios.get(`/report/`, { params: params })
      .then((res) => res.data), {});
};
