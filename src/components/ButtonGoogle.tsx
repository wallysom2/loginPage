import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const GoogleButton = () => {
  const navigate = useNavigate();
  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);

  return (
    <div style={{ marginTop: '30px', width: '385.88px' }}>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}
      >
        <GoogleLogin
          theme="outline"
          size="medium"
          text="continue_with"
          shape="circle"
          logo_alignment="center"
          width="385"
          auto_select
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              const decoded = jwtDecode(credentialResponse.credential);
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