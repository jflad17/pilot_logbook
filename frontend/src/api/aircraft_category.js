import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import queryClient from '@services/queryClient';

// import Toast from '@assets/js/toast.js';

export const useAircraftCategory = (params) => {
  return useQuery(['aircraftCategory', params], () => axios.get(`/aircraft-category/`, { params: params })
      .then((res) => res.data), {});
};

export const useCreateAircraftCategory = () => {
  return useMutation((values) => axios.post(`/aircraft-category/`, values).then((res) => res.data), {
    onMutate: (values) => {
      queryClient.cancelQueries('aircraftCategory');
    },
    onSettled: () => {
      queryClient.invalidateQueries('aircraftCategory');
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

export const useUpdateAircraftCategory = () => {
  return useMutation((values) => axios.put(`/aircraft-category/${values.idFlight}`, values).then((res) => res.data), {
    onMutate: (values) => {
      queryClient.setQueryData(['aircraftCategory', values.idFlight], values);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['aircraftCategory', variables.idAircraftCategory]);
      queryClient.invalidateQueries('aircraftCategory');
      // new Toast().success('Successfully updated aircraftCategory.');
    },
    onError: (err) => {
      // new Toast().error('Error updating aircraftCategory!');
      throw err;
    },
  });
};

export const useDeleteAircraftCategory = () => {
  return useMutation((id) => axios.delete(`/aircraft-category/${id}`).then((res) => res), {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('aircraftCategory');
      // new Toast().success('Successfully deleted aircraftCategory.');
    },
    onError: (err) => {
      // new Toast().error('Error deleting aircraftCategory!');
      throw err;
    },
  });
};
