import axiosInstance from './../config/axiosConfig';

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get('auth/profile/');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o perfil do usuário:', error);
    throw error;
  }
};
