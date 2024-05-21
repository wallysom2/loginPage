import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FacebookLoginClient } from '@greatsumini/react-facebook-login';

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

export const useFacebookAuth = () => {
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
                localStorage.setItem('authType', 'facebook');
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
    localStorage.removeItem('authType');
    navigate('/');
  };

  return { user, handleLogout };
};
