import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import GoogleProfile from './pages/GoogleProfile';
import Login from './pages/SignIn';
import { AuthProvider } from './contexts/AuthContext';
import { ReloadProvider } from './contexts/ReloadContext';

const App = () => {
  return (
    <AuthProvider>
      <ReloadProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/google-profile" element={<GoogleProfile />} />
          </Routes>
        </BrowserRouter>
      </ReloadProvider>
    </AuthProvider>
  );
};

export default App;
