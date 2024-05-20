import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FacebookLoginClient } from '@greatsumini/react-facebook-login';

import perfil from '@images/perfil.jpg';
import CustomButton from '@/components/ButtonCustom';
import ProfileDetail from '@/components/ProfileDetail';
import ButtonToggleTheme from '@/components/ButtonToggleTheme';

interface ProfileResponse {
  id: string;
  name: string;
  email: string;
  picture: {
    data: {
      url: string;
    };
  };
}

interface User {
  picture: string;
  name: string;
  email: string;
}

function FacebookProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    FacebookLoginClient.getLoginStatus((res) => {
      console.log(res.status);
      if (res.status === 'connected') {
        FacebookLoginClient.getProfile(
          (res: unknown) => {
            if (res) {
              const profile = res as ProfileResponse;
              if (profile && profile.picture && profile.picture.data) {
                const user = {
                  id: profile.id,
                  name: profile.name,
                  email: profile.email,
                  picture: profile.picture.data.url,
                };
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                navigate('/facebook-profile');
              }
            }
          },
          {
            fields: 'id,name,email,picture',
          },
        );
      } else {
        FacebookLoginClient.login(
          (res) => {
            console.log(res);
          },
          {
            scope: 'public_profile,email',
            ignoreSdkError: false,
          },
        );
      }
    });

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        picture: parsedUser.picture,
        name: parsedUser.name,
        email: parsedUser.email,
      });
    }
  }, []);

  const handleLogout = () => {
    FacebookLoginClient.logout(() => {
      console.log('logout completed!');
    });
    localStorage.removeItem('user');
    navigate('/');
  };

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
          src={user?.picture ? user.picture : perfil}
          alt="Image profile"
        />
        <ProfileDetail label="Name" value={user?.name || ''} />
        <ProfileDetail label="Email" value={user?.email || ''} />{' '}
      </div>
    </div>
  );
}

export default FacebookProfile;
