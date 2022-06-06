import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import queryClient from '@services/queryClient';

// import Toast from '@assets/js/toast.js';

export const usePilotType = (params) => {
  return useQuery(['pilotType', params], () => axios.get(`/pilot-type/`, { params: params })
      .then((res) => res.data), {});
};

export const useCreatePilotType = () => {
  return useMutation((values) => axios.post(`/pilot-type/`, values).then((res) => res.data), {
    onMutate: (values) => {
      queryClient.cancelQueries('pilotType');
    },
    onSettled: () => {
      queryClient.invalidateQueries('pilotType');
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

export const useUpdatePilotType = () => {
  return useMutation((values) => axios.put(`/pilot-type/${values.idFlight}`, values).then((res) => res.data), {
    onMutate: (values) => {
      queryClient.setQueryData(['pilotType', values.idFlight], values);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['pilotType', variables.idAircraftCategory]);
      queryClient.invalidateQueries('pilotType');
      // new Toast().success('Successfully updated aircraftCategory.');
    },
    onError: (err) => {
      // new Toast().error('Error updating aircraftCategory!');
      throw err;
    },
  });
};

export const useDeletePilotType = () => {
  return useMutation((id) => axios.delete(`/pilot-type/${id}`).then((res) => res), {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('pilotType');
      // new Toast().success('Successfully deleted aircraftCategory.');
    },
    onError: (err) => {
      // new Toast().error('Error deleting aircraftCategory!');
      throw err;
    },
  });
};
