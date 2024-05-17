import { useNavigate } from 'react-router-dom';
import CustomButton from '@/components/Button';
import perfil from '../assets/images/perfil.svg';
import ProfileDetail from '../components/ProfileDetail';
import { useProfile } from '../hooks/useProfile';

function Profile() {
  const navigate = useNavigate();
  const profile = useProfile();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  if (!profile) {
    console.log('Profile is not loaded yet...:', profile);
    navigate('/');
    return null;
  }

  let imageUrl;
  if (window.innerWidth > 800) {
    imageUrl = profile.avatar.image_high_url;
  } else if (window.innerWidth > 400) {
    imageUrl = profile.avatar.image_medium_url;
  } else {
    imageUrl = profile.avatar.image_low_url;
  }

  return (
    <div className="min-h-screen bg-grayy">
      <div className="flex h-16 items-center justify-end bg-white">
        <div className="mr-7">
          <CustomButton
            label="Logout"
            style={{ width: '272px', height: '44px' }}
            onClick={handleLogout}
          ></CustomButton>
        </div>
      </div>
      <div
        className="mx-auto mt-24 flex h-[315px] w-[356px] flex-col items-start items-center justify-center rounded-[18px] bg-[#FDFDFD] p-20"
        style={{ boxShadow: '0px 0px 64px 0px rgba(0, 0, 0, 0.1)' }}
      >
        <h3 className="pt-4 text-left font-nunito text-xs font-semibold leading-3 text-[#2F2F2F]">
          Profile Picture
        </h3>{' '}
        <img
          className="mb-3 mt-3 h-[56px] w-[58px] rounded-[8px]"
          src={imageUrl ? imageUrl : perfil}
          alt="Avatar"
        />
        <ProfileDetail label="Name" value={profile.name} />
        <ProfileDetail label="Email" value={profile.email} />
      </div>
    </div>
  );
}

export default Profile;
