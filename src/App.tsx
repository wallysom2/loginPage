import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import GoogleProfile from './pages/GoogleProfile';
import Login from './pages/SignIn';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/google-profile" element={<GoogleProfile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
