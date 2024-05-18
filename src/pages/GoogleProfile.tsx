import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/ButtonCustom';
import perfil from '../assets/images/perfil.svg';
import ProfileDetail from '../components/ProfileDetail';
import { useLocation } from 'react-router-dom';
import ButtonToggleTheme from '../components/ButtonToggleTheme';

function GoogleProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state ? location.state.user : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    console.warn('User is not logged in');
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-bgprofile dark:bg-gradiente">
      <div className="flex h-16 items-center justify-end bg-white">
        <div className="mr-7">
          <CustomButton
            label="Logout"
            style={{ width: '272px', height: '44px' }}
            onClick={handleLogout}
          ></CustomButton>
        </div>
      </div>
      <ButtonToggleTheme />
      {''}
      <div
        className="mx-auto mt-24 flex h-[315px] w-[356px] flex-col items-start items-center justify-center rounded-[18px] bg-[#FDFDFD] p-20"
        style={{ boxShadow: '0px 0px 64px 0px rgba(0, 0, 0, 0.1)' }}
      >
        <h3 className="pt-4 text-left font-nunito text-xs font-semibold leading-3 text-[#2F2F2F]">
          Profile Picture
        </h3>{' '}
        <img
          className="mb-3 mt-3 h-[56px] w-[58px] rounded-[8px]"
          src={user.picture ? user.picture : perfil}
          alt="Image profile"
        />
        <ProfileDetail label="Name" value={user.name} />
        <ProfileDetail label="Email" value={user.email} />
      </div>
    </div>
  );
}

export default GoogleProfile;
