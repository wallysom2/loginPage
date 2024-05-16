// services/authService.ts
import axios from 'axios';

interface UserData {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  avatar: string | null;
  type: string;
  created: string;
  modified: string;
  role: string;
}

interface TokensData {
  refresh: string;
  access: string;
}

interface ApiResponse {
  user: UserData;
  tokens: TokensData;
}

export const loginService = async (email: string, password: string) => {
  const response = await axios.post<ApiResponse>(
    'https://api.homologation.cliqdrive.com.br/auth/login/',
    {
      email: email,
      password: password,
    },
    {
      headers: {
        Accept: 'application/json;version=v1_web',
        'Content-Type': 'application/json',
      },
    },
  );
  console.log(response.data);
  console.log(response.data.tokens);
  return response.data.tokens;
};
