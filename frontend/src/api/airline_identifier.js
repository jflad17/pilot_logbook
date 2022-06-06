import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import queryClient from '@services/queryClient';

// import Toast from '@assets/js/toast.js';

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
      // new Toast().success('Successfully created aircraftCategory.');
    },
    onError: (err) => {
      // new Toast().error('Error creating aircraftCategory!');
      throw err;
    },
  });
};

export const useUpdateAirlineIdentifier = () => {
  return useMutation((values) => axios.put(`/airline-identifier/${values.idFlight}`, values).then((res) => res.data), {
    onMutate: (values) => {
      queryClient.setQueryData(['airlineIdentifier', values.idFlight], values);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['airlineIdentifier', variables.idAircraftCategory]);
      queryClient.invalidateQueries('airlineIdentifier');
      // new Toast().success('Successfully updated aircraftCategory.');
    },
    onError: (err) => {
      // new Toast().error('Error updating aircraftCategory!');
      throw err;
    },
  });
};

export const useDeleteAirlineIdentifier = () => {
  return useMutation((id) => axios.delete(`/airline-identifier/${id}`).then((res) => res), {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('airlineIdentifier');
      // new Toast().success('Successfully deleted aircraftCategory.');
    },
    onError: (err) => {
      // new Toast().error('Error deleting aircraftCategory!');
      throw err;
    },
  });
};
