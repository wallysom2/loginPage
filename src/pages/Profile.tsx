import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomButton from '@/components/Button';
import perfil from '../assets/images/perfil.svg';

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
    return <div>Loading. </div>;
  }

  console.log('Rendering profile...');

  return (
    <div className="bg-grayy">
      <div className="flex h-16 items-center justify-end bg-white">
        <div className="mr-7">
          <CustomButton label="Logout" onClick={handleLogout}></CustomButton>
        </div>
      </div>
      <div className="flex min-h-full min-w-full items-start justify-center bg-grayy bg-red-200 p-20">
        <div
          className="flex h-[315px] w-[356px] flex-col flex-col items-center rounded-[18px] bg-blue-200 bg-white p-8"
          style={{ boxShadow: '0px 0px 64px 0px rgba(0, 0, 0, 0.25)' }}
        >
          <h3>Profile Picture</h3>
          <img
            className="mb-3 mt-3 h-16 w-16 rounded-full"
            src={profile.avatar ? profile.avatar.image_high_url : perfil}
            alt="Avatar"
          />
          <div className="w-full">
            <p className="flex justify-start pb-1">
              Your<strong> Name </strong>
            </p>
          </div>

          <div className="flex h-11 w-[296px] flex-col justify-center rounded-[8px] bg-gray-200 p-5">
            {profile.name}
          </div>
          <div className="w-full">
            <h3 className="flex justify-start pb-1 pt-2">
              Your <strong>Email</strong>
            </h3>
          </div>
          <div className="flex h-11 w-[296px] flex-col justify-center rounded-[8px] bg-gray-200 p-5">
            {profile.email}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
