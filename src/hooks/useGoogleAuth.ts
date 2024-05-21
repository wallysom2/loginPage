import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const useGoogleAuth = () => {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode(credentialResponse.credential);
      localStorage.setItem('user', JSON.stringify(decoded));
      localStorage.setItem('authType', 'google');
      localStorage.setItem('token', credentialResponse.credential);
      navigate('/google-profile', { state: { user: decoded } });
    } else {
      console.error('Credential is undefined');
    }
  };

  const handleError = () => {
    console.error('Login Failed');
  };

  return { handleSuccess, handleError };
};
