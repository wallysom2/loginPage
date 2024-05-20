import axiosInstance from '@/config/axiosConfig';
import { ApiResponse } from '@/types/userTypes';

export const loginService = async (email: string, password: string) => {
  const response = await axiosInstance.post<ApiResponse>('auth/login/', {
    email: email,
    password: password,
  });

  localStorage.setItem('tokens', JSON.stringify(response.data.tokens));

  return response.data.tokens;
};
