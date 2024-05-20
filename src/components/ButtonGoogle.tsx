import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const GoogleButton = () => {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: '30px' }}>
      <GoogleOAuthProvider
        clientId={
          import.meta.env.VITE_GOOGLE_CLIENT_ID ||
          '1028449546448-ac2aoq1pa632ums868da2f702kp86ek1.apps.googleusercontent.com'
        }
      >
        <GoogleLogin
          type="standard"
          theme="outline"
          size="large"
          width="187px"
          text="signin"
          shape="square"
          auto_select
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              const decoded = jwtDecode(credentialResponse.credential);
              localStorage.setItem('user', JSON.stringify(decoded));
              localStorage.setItem('token', credentialResponse.credential);
              navigate('/google-profile', { state: { user: decoded } });
            } else {
              console.error('Credential is undefined');
            }
          }}
          onError={() => {
            console.error('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleButton;
