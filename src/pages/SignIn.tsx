import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/Input';
import b2bitLogo from '../assets/images/b2bit-logo.svg';
import CustomButton from '../components/Button';
import GoogleButton from '../components/GoogleButton';

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    errorMessage,
    setErrorMessage,
    authToken,
  } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('*Preencha todos os campos');
    } else {
      await handleLogin();
    }
  };

  useEffect(() => {
    if (authToken) {
      navigate('/profile');
    }
  }, [authToken, navigate]);

  return (
    <div className="flex min-h-screen min-w-full items-center justify-center">
      <div
        className="flex h-[620px] w-[438px] flex-col items-center rounded-[18px] p-12"
        style={{ boxShadow: '0px 0px 64px 0px rgba(0, 0, 0, 0.25)' }}
      >
        <img
          src={b2bitLogo}
          alt="B2Bit Logo"
          className="md-6 relative mb-8 h-[94.81px] w-[309.6px]"
        />
        <form
          onSubmit={handleSubmit}
          className="mb-9 h-[54.25px] w-[385.88px] flex-col gap-[13.5px] rounded-tl-[9px] p-[18px] pb-[20.25px]"
        >
          <label
            htmlFor="email"
            className="text-left font-nunito text-lg font-semibold leading-[22.5px] tracking-[0.03em] text-[#262626]"
          >
            Email
          </label>
          <Input
            type="text"
            placeholder="@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="password"
            className="text-left font-nunito text-lg font-semibold leading-[22.5px] tracking-[0.03em] text-[#262626]"
          >
            Password
          </label>
          <Input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomButton label="Sign In"></CustomButton>
          {errorMessage && (
            <p className="pt-3 text-red-500">{errorMessage}</p>
          )}{' '}
        </form>
        <GoogleButton />
      </div>
    </div>
  );
};

export default Login;
