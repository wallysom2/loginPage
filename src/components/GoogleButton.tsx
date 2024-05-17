import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleButton = () => {
  return (
    <div style={{ paddingTop: '290px' }}>
      <GoogleOAuthProvider clientId="1028449546448-ac2aoq1pa632ums868da2f702kp86ek1.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
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