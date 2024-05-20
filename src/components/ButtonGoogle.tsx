import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';

const GoogleButton = () => {
  const { handleSuccess, handleError } = useGoogleAuth();

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
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleButton;
