import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import queryClient from '@services/queryClient';
import { toast } from 'react-toastify';

export const useAirlineIdentifier = (params) => {
  return useQuery(['airlineIdentifier', params], () => axios.get(`/airline-identifier/`, { params: params })
      .then((res) => res.data), {});
};

export const useCreateAirlineIdentifier = () => {
  return useMutation((values) => axios.post(`/airline-identifier/`, values).then((res) => res.data), {
    onMutate: (values) => {
      queryClient.cancelQueries('airlineIdentifier');
    },
    onSettled: () => {
      queryClient.invalidateQueries('airlineIdentifier');
    },
    onSuccess: () => {
      toast.success('Successfully created aircraftCategory.');
    },
    onError: (err) => {
      toast.error('Error creating aircraftCategory!');
      throw err;
    },
  });
};

export const useUpdateAirlineIdentifier = () => {
  return useMutation((values) => axios.put(`/airline-identifier/${values.id}`, values).then((res) => res.data), {
    onMutate: (values) => {
      queryClient.setQueryData(['airlineIdentifier', values.id], values);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['airlineIdentifier', variables.id]);
      queryClient.invalidateQueries('airlineIdentifier');
      toast.success('Successfully updated aircraftCategory.');
    },
    onError: (err) => {
      toast.error('Error updating aircraftCategory!');
      throw err;
    },
  });
};

export const useDeleteAirlineIdentifier = () => {
  return useMutation((id) => axios.delete(`/airline-identifier/${id}`).then((res) => res), {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('airlineIdentifier');
      toast.success('Successfully deleted aircraftCategory.');
    },
    onError: (err) => {
      toast.error('Error deleting aircraftCategory!');
      throw err;
    },
  });
};
