import { useNavigate } from 'react-router-dom';
import CustomButton from '@/components/Button';
import perfil from '../assets/images/perfil.svg';
import ProfileDetail from '../components/ProfileDetail';

function Gprofile() {
  const navigate = useNavigate();
  const userItem = localStorage.getItem('user');
  const user = userItem ? JSON.parse(userItem) : null;
  console.log('User:', user);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    console.log('User is not logged in');
    navigate('/');
    return null;
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
          src={user.imageUrl ? user.imageUrl : perfil}
          alt="Image profile"
        />
        <ProfileDetail label="Name" value={user.name} />
        <ProfileDetail label="Email" value={user.email} />
      </div>
    </div>
  );
}

export default Gprofile;
