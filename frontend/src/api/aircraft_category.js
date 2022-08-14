import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import queryClient from '@services/queryClient';
import { toast } from 'react-toastify';

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
      toast.success('Successfully created aircraftCategory.');
    },
    onError: (err) => {
      toast.error('Error creating aircraftCategory!');
      throw err;
    },
  });
};

export const useUpdateAircraftCategory = () => {
  return useMutation((values) => axios.put(`/aircraft-category/${values.id}`, values).then((res) => res.data), {
    onMutate: (values) => {
      queryClient.setQueryData(['aircraftCategory', values.id], values);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['aircraftCategory', variables.id]);
      queryClient.invalidateQueries('aircraftCategory');
      toast.success('Successfully updated aircraftCategory.');
    },
    onError: (err) => {
      toast.error('Error updating aircraftCategory!');
      throw err;
    },
  });
};

export const useDeleteAircraftCategory = () => {
  return useMutation((id) => axios.delete(`/aircraft-category/${id}`).then((res) => res), {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('aircraftCategory');
      toast.success('Successfully deleted aircraftCategory.');
    },
    onError: (err) => {
      toast.error('Error deleting aircraftCategory!');
      throw err;
    },
  });
};
