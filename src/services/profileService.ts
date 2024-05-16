import axios from 'axios';

export const getProfile = async () => {
  const response = await axios.get(
    'https://api.homologation.cliqdrive.com.br/auth/profile/',
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        Accept: 'application/json;version=v1_web',
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};
