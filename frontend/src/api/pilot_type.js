import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import queryClient from '@services/queryClient';
import { toast } from 'react-toastify';

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
      toast.success('Successfully created aircraftCategory.');
    },
    onError: (err) => {
      toast.error('Error creating aircraftCategory!');
      throw err;
    },
  });
};

export const useUpdatePilotType = () => {
  return useMutation((values) => axios.put(`/pilot-type/${values.id}`, values).then((res) => res.data), {
    onMutate: (values) => {
      queryClient.setQueryData(['pilotType', values.id], values);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['pilotType', variables.id]);
      queryClient.invalidateQueries('pilotType');
      toast.success('Successfully updated aircraftCategory.');
    },
    onError: (err) => {
      toast.error('Error updating aircraftCategory!');
      throw err;
    },
  });
};

export const useDeletePilotType = () => {
  return useMutation((id) => axios.delete(`/pilot-type/${id}`).then((res) => res), {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('pilotType');
      toast.success('Successfully deleted aircraftCategory.');
    },
    onError: (err) => {
      toast.error('Error deleting aircraftCategory!');
      throw err;
    },
  });
};
