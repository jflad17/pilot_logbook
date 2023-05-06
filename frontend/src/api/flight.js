import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import queryClient from '@services/queryClient';

// import Toast from '@assets/js/toast.js';

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
      // new Toast().success('Successfully created flight.');
    },
    onError: (err) => {
      // new Toast().error('Error creating flight!');
      throw err;
    },
  });
};

export const useUpdateFlight = () => {
  return useMutation((values) => axios.put(`/flight/${values.idFlight}`, values).then((res) => res.data), {
    onMutate: (values) => {
      queryClient.setQueryData(['flight', values.idFlight], values);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['flight', variables.idFlight]);
      queryClient.invalidateQueries('flight');
      // new Toast().success('Successfully updated flight.');
    },
    onError: (err) => {
      // new Toast().error('Error updating employee!');
      throw err;
    },
  });
};

export const useDeleteFlight = () => {
  return useMutation((id) => axios.delete(`/flight/${id}`).then((res) => res), {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('flight');
      // new Toast().success('Successfully deleted flight.');
    },
    onError: (err) => {
      // new Toast().error('Error deleting employee!');
      throw err;
    },
  });
};
