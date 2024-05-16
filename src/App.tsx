import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
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
          </Routes>
        </BrowserRouter>
      </ReloadProvider>
    </AuthProvider>
  );
};

export default App;