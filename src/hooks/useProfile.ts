// src/hooks/useProfile.ts
import { useEffect, useState } from 'react';
import { getProfile } from '../services/profileService';

interface Profile {
  avatar: {
    image_high_url: string;
    image_medium_url: string;
    image_low_url: string;
  };
  name: string;
  email: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile()
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error(
          'There has been a problem with your fetch operation:',
          error,
        );
      });
  }, []);

  return profile;
};
