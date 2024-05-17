import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const GoogleButton = () => {
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: '290px' }}>
      <GoogleOAuthProvider clientId="1028449546448-ac2aoq1pa632ums868da2f702kp86ek1.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
            if (credentialResponse.credential) {
              const decoded = jwtDecode(credentialResponse.credential);
              console.log(decoded);
              navigate('/gprofile');
            } else {
              console.log('Credential is undefined');
            }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleButton;
