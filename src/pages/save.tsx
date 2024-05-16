import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
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

      console.log('Usuário:', response.data.user);
      console.log('Tokens:', response.data.tokens);
      localStorage.setItem('authToken', response.data.tokens.access);
      navigate('/profile');
    } catch (error: any) {
      if (error.response) {
        console.error('Erro ao fazer login:', error.response.data);
      } else {
        console.error('Erro ao fazer login:', error.message);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
