import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './pages/Profile';
import GoogleProfile from './pages/GoogleProfile';
import FacebookProfile from './pages/FacebookProfile';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/google-profile" element={<GoogleProfile />} />
            <Route path="/facebook-profile" element={<FacebookProfile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
