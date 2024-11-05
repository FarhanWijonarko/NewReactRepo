import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { At, Lock, EyeSlash, Eye } from '@phosphor-icons/react';
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setEror] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handelLogin = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };
    try {
      const res = await axios.post('https://take-home-test-api.nutech-integrasi.com/login', payload);
      if (res.status === 200) {
        console.log(res.data.data.token);
        const token = res.data.data.token; // Mendapatkan token dari respons
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 12); // Set expired 12 jam dari sekarang

        // Simpan token dan waktu kedaluwarsa di localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('token_expiration', expirationDate.toISOString());
        navigate('/homepage');
      }
    } catch (err) {
      console.log(err);
      if (err.status === 400) {
        setEror(err.response.data.message);
        return;
      } else if (err.status === 401) {
        setEror(err.response.data.message);
        return;
      }

    }
    const expiration = localStorage.getItem('token_expiration');
    if (!expiration) return true; // Jika tidak ada expiration date, anggap expired

    return new Date() > new Date(expiration); // True jika sudah lewat tanggal kedaluwarsa
  };
  const navigate = useNavigate();
  return (
    <div className="flex h-screen justify-center my-auto mx-auto">
      <div className="w-[1500px] flex flex-col justify-center items-center">
        <div className="text-center items-center flex gap-2">
          <img src="img/Logo.png" alt="" />
          <p className="text-2xl  font-bold">SIMS PPOB</p>
        </div>
        <p className="text-3xl mt-[50px] w-[400px] text-center font-bold">Masuk atau buat akun untuk memulai</p>
        <div className="flex flex-col gap-4 mt-[70px]">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="w-[400px] h-[40px] items-center gap-4 flex border border-grey-800 px-3 py-1 rounded ">
            <At size={20} className="text-grey-800 opacity-50" />
            <input onChange={(e) => setEmail(e.target.value)} className="inactive focus:outline-none w-full" placeholder="masukan email anda" type="email" />
          </div>
          <div className="w-[400px] h-[40px] items-center gap-4 flex border border-grey-800 px-3 py-1 rounded ">
            <Lock size={18} className="text-grey-800 opacity-50" />
            <input onChange={(e) => setPassword(e.target.value)} className="inactive focus:outline-none" placeholder="konfirmasi password" type={isPasswordVisible ? 'text' : 'password'} />
            <div onClick={togglePasswordVisibility} className="opacity-50 cursor-pointer ml-[110px]">
              {isPasswordVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
            </div>
          </div>
        </div>
        <button type="submit" onClick={handelLogin} className="w-[400px] h-[40px] bg-[#F13B2F] mt-[40px] text-white rounded">
          Masuk
        </button>
        <div className="gap-1 flex mt-[10px]">
          <p className="text-sm opacity-50">belum punya akun? registrasi</p>
          <button onClick={() => navigate('/register')} className="text-sm text-[#F13B2F] font-bold">
            disini
          </button>
        </div>
      </div>
      <div>
        <img className="w-screen h-screen" src="img/IllustrasiLogin.png" alt="Illustrasi" />
      </div>
    </div>
  );
};

export default Login;
