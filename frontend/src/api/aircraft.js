import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import queryClient from '@services/queryClient';
import { toast } from 'react-toastify';

export const useAircraft = (params) => {
  return useQuery(['aircraft', params], () => axios.get(`/aircraft/`, { params: params })
      .then((res) => res.data), {});
};

export const useCreateAircraft = () => {
  return useMutation((values) => axios.post(`/aircraft/`, values).then((res) => res.data), {
    onMutate: (values) => {
      queryClient.cancelQueries('aircraft');
    },
    onSettled: () => {
      queryClient.invalidateQueries('aircraft');
    },
    onSuccess: () => {
      toast.success('Successfully created aircraft.');
    },
    onError: (err) => {
      toast.error('Error creating aircraft!');
      throw err;
    },
  });
};

export const useUpdateAircraft = () => {
  return useMutation((values) => axios.put(`/aircraft/${values.id}`, values).then((res) => res.data), {
    onMutate: (values) => {
      queryClient.setQueryData(['aircraft', values.id], values);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['aircraft', variables.id]);
      queryClient.invalidateQueries('aircraft');
      toast.success('Successfully updated aircraft.');
    },
    onError: (err) => {
      toast.error('Error updating aircraft!');
      throw err;
    },
  });
};

export const useDeleteAircraft = () => {
  return useMutation((id) => axios.delete(`/aircraft/${id}`).then((res) => res), {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('aircraft');
      toast.success('Successfully deleted aircraft.');
    },
    onError: (err) => {
      toast.error('Error deleting aircraft!');
      throw err;
    },
  });
};
