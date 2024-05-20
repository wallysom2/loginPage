import FacebookLogin from '@greatsumini/react-facebook-login';
import { FaFacebookF } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const FacebookButton = () => {
  const navigate = useNavigate();
  return (
    <div className="relative mt-8">
      <FaFacebookF className="absolute left-1 top-1 m-1 text-[20px] text-blue-500" />
      <FacebookLogin
        appId={import.meta.env.VITE_FACEBOOK_CLIENT_ID || '995967932185937'}
        fields="name,email,picture"
        data-size="small"
        className="mt-[-2px] h-10 w-[187px] cursor-pointer rounded border border-gray-300 bg-white pb-0.5 pl-4 text-[14px] font-semibold text-gray-600"
        onSuccess={(response) => {
          console.log('Login Success!', response);
          navigate('/facebook-profile');
        }}
        onFail={(error) => {
          console.log('Login Failed!', error);
        }}
        onProfileSuccess={(response) => {
          console.log('Get Profile Success!', response);
        }}
      />
    </div>
  );
};

export default FacebookButton;
