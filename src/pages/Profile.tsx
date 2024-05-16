import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomButton from '@/components/Button';
import perfil from '../assets/images/perfil.svg';
import ProfileDetail from '../components/ProfileDetail';

interface Avatar {
  id: number;
  image_high_url: string;
  image_medium_url: string;
  image_low_url: string;
}

interface ProfileData {
  id: string;
  avatar: Avatar;
  name: string;
  last_name: string;
  email: string;
}

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    axios
      .get('https://api.homologation.cliqdrive.com.br/auth/profile/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          Accept: 'application/json;version=v1_web',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Data received:', response.data);
        setProfile(response.data);
        console.log('Profile:', response.data);
      })
      .catch((error) => {
        console.error(
          'There has been a problem with your fetch operation:',
          error,
        );
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  if (!profile) {
    console.log('Profile is not loaded yet...:', profile);
    navigate('/');
    return null;
  }

  console.log('Rendering profile...');

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
        className="mx-auto mt-24 flex h-[315px] w-[356px] flex-col items-start items-center justify-center rounded-[18px] bg-[#FDFDFD] bg-blue-200 p-20"
        style={{ boxShadow: '0px 0px 64px 0px rgba(0, 0, 0, 0.1)' }}
      >
        <h3 className="pt-4 text-left font-nunito text-xs font-semibold leading-3 text-[#2F2F2F]">
          Profile Picture
        </h3>{' '}
        <img
          className="mb-3 mt-3 h-[56px] w-[58px] rounded-[8px]"
          src={profile.avatar ? profile.avatar.image_high_url : perfil}
          alt="Avatar"
        />
        <ProfileDetail label="Name" value={profile.name} />
        <ProfileDetail label="Email" value={profile.email} />
      </div>
    </div>
  );
}

export default Profile;
