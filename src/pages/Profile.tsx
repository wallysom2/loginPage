import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
