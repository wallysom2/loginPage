import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import GoogleProfile from './pages/GoogleProfile';
import Login from './pages/SignIn';
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
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
