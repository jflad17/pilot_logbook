import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import queryClient from '@services/queryClient';
import { toast } from 'react-toastify';

export const useFlight = (params) => {
  return useQuery(['flight', params], () => axios.get(`/flight/`, { params: params }).then((res) => res.data), {});
};

export const useCreateFlight = () => {
  return useMutation((values) => axios.post(`/flight/`, values).then((res) => res.data), {
    onMutate: (values) => {
      queryClient.cancelQueries('flight');
    },
    onSettled: () => {
      queryClient.invalidateQueries('flight');
    },
    onSuccess: () => {
      toast.success('Successfully created flight.');
    },
    onError: (err) => {
      toast.error('Error creating flight!');
      throw err;
    },
  });
};

export const useUpdateFlight = () => {
  return useMutation((values) => axios.put(`/flight/${values.id}`, values).then((res) => res.data), {
    onMutate: (values) => {
      queryClient.setQueryData(['flight', values.id], values);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['flight', variables.id]);
      queryClient.invalidateQueries('flight');
      toast.success('Successfully updated flight.');
    },
    onError: (err) => {
      toast.error('Error updating employee!');
      throw err;
    },
  });
};

export const useDeleteFlight = () => {
  return useMutation((id) => axios.delete(`/flight/${id}`).then((res) => res), {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('flight');
      toast.success('Successfully deleted flight.');
    },
    onError: (err) => {
      toast.error('Error deleting employee!');
      throw err;
    },
  });
};
