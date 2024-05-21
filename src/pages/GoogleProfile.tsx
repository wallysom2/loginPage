import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import perfil from '@images/perfil.jpg';
import CustomButton from '@/components/ButtonCustom';
import ProfileDetail from '@/components/ProfileDetail';
import ButtonToggleTheme from '@/components/ButtonToggleTheme';

interface User {
  picture: string;
  name: string;
  email: string;
}

export function GoogleProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      console.warn('User is not logged in');
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authType');
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bgprofile dark:bg-bgdarkcard">
      <div className="flex h-16 items-center justify-end bg-white dark:bg-gradiente">
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
        className="mx-auto mt-24 flex h-[315px] w-[356px] flex-col items-start items-center justify-center rounded-[18px] bg-[#FDFDFD] p-20 dark:bg-gradiente"
        style={{ boxShadow: '0px 0px 64px 0px rgba(0, 0, 0, 0.1)' }}
      >
        <h3 className="pt-4 text-left font-nunito text-xs font-semibold leading-3 text-[#2F2F2F] dark:text-white">
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
