import axios from 'axios';
import {
  useQuery,
  useMutation,
} from 'react-query';
import queryClient from '@services/queryClient';
import { toast } from 'react-toastify';

export const useAirport = (params) => {
  return useQuery(['airport', params], () => axios.get(`/airport/`, { params: params })
      .then((res) => res.data), {});
};


export const useCreateAirport = () => {
  return useMutation((values) => axios.post(`/airport/`, values).then((res) => res.data), {
    onMutate: (values) => {
      queryClient.cancelQueries('airport');
    },
    onSettled: () => {
      queryClient.invalidateQueries('airport');
    },
    onSuccess: () => {
      toast.success('Successfully created airport.');
    },
    onError: (err) => {
      toast.error('Error creating airport!');
      throw err;
    },
  });
};

export const useUpdateAirport = () => {
  return useMutation((values) => axios.put(`/airport/${values.id}`, values).then((res) => res.data), {
    onMutate: (values) => {
      queryClient.setQueryData(['airport', values.id], values);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['airport', variables.id]);
      queryClient.invalidateQueries('airport');
      toast.success('Successfully updated airport.');
    },
    onError: (err) => {
      toast.error('Error updating airport!');
      throw err;
    },
  });
};

export const useDeleteAirport = () => {
  return useMutation((id) => axios.delete(`/airport/${id}`).then((res) => res), {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('airport');
      toast.success('Successfully deleted airport.');
    },
    onError: (err) => {
      toast.error('Error deleting airport!');
      throw err;
    },
  });
};
