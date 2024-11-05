import { useState } from 'react';
import axios from 'axios';
import { At, Lock, User, EyeSlash, Eye } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [error, setEror] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passEror, setPassEror] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisibleConfirm, setIsPasswordVisibleConfirm] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const togglePasswordVisibilityConfirm = () => {
    setIsPasswordVisibleConfirm(!isPasswordVisibleConfirm);
  };
  // Fungsi handleRegis untuk mengelola proses registrasi
  const handleRegis = async (e) => {
    e.preventDefault();

    // Cek apakah password dan confirm password sama
    if (password !== confirmPassword) {
      setPassEror(true);
      setConfirmPassword('');
      return;
    } else {
      setPassEror(false);
    }

    const payload = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
    };



    // Mengirim data ke API
    try {
      const res = await axios.post('https://take-home-test-api.nutech-integrasi.com/registration', payload);
      if (res.status === 200) {
        alert('Registrasi berhasil');
        navigate('/');
      } else {
        alert('Registrasi gagal');
      }
    } catch (err) {
      console.log(err);
      if (err.status === 400) {
        setEror(err.response.data.message);
        return;
      }
    }
  };

  // Komponen return utama untuk layout halaman registrasi
  return (
    <div className="flex h-screen justify-center my-auto mx-auto">
      <div className="w-[1500px] flex flex-col justify-center items-center">
        <div className="text-center items-center flex gap-2">
          <img src="img/logo.png" alt="Logo" />
          <p className="text-2xl font-bold">SIMS PPOB</p>
        </div>
        <p className="text-3xl mt-[20px] w-[400px] text-center font-bold">Lengkapi data untuk membuat akun</p>

        <div className="flex flex-col gap-4 mt-[20px]">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {/* Input email */}
          <div className="w-[400px] h-[40px] items-center gap-4 flex border border-grey-800 px-3 py-1 rounded ">
            <At size={20} className="text-grey-800 opacity-50" />
            <input onChange={(e) => setEmail(e.target.value)} className="inactive focus:outline-none w-full" placeholder="masukan email anda" type="email" />
          </div>

          {/* Input nama depan */}
          <div className="w-[400px] h-[40px] items-center gap-4 flex border border-grey-800 px-3 py-1 rounded ">
            <User size={20} className="text-grey-800 opacity-50" />
            <input onChange={(e) => setFirstName(e.target.value)} className="inactive focus:outline-none w-full" placeholder="nama depan" type="text" />
          </div>

          {/* Input nama belakang */}
          <div className="w-[400px] h-[40px] items-center gap-4 flex border border-grey-800 px-3 py-1 rounded ">
            <User size={20} className="text-grey-800 opacity-50" />
            <input onChange={(e) => setLastName(e.target.value)} className="inactive focus:outline-none w-full" placeholder="nama belakang" type="text" />
          </div>

          {/* Input password */}
          <div className="w-[400px] h-[40px] items-center gap-4 flex border border-grey-800 px-3 py-1 rounded ">
            <Lock size={18} className="text-grey-800 opacity-50" />
            <input onChange={(e) => setPassword(e.target.value)} className="inactive focus:outline-none" placeholder="konfirmasi password" type={isPasswordVisible ? 'text' : 'password'} />
            <div onClick={togglePasswordVisibility} className="opacity-50 cursor-pointer ml-[110px]">
              {isPasswordVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {/* Input konfirmasi password */}
          <div className={`${passEror ? 'border-red-500' : 'border-grey-800'} w-[400px] h-[40px] items-center gap-4 flex border px-3 py-1 rounded`}>
            <Lock size={18} className={`${passEror ? 'text-red-500' : 'text-grey-800'} opacity-50 `} />
            <input onChange={(e) => setConfirmPassword(e.target.value)} className="inactive focus:outline-none" placeholder="konfirmasi password" type={isPasswordVisibleConfirm ? 'text' : 'password'} />
            <div onClick={togglePasswordVisibilityConfirm} className="opacity-50 cursor-pointer ml-[110px]">
              {isPasswordVisibleConfirm ? <EyeSlash size={18} /> : <Eye size={18} />}
            </div>
          </div>
          {passEror ? <p className="text-red-500 text-sm opacity-80 -mt-3 text-right">password tidak sama </p> : null}
        </div>

        {/* Tombol Registrasi */}
        <button onClick={handleRegis} className="w-[400px] h-[40px] bg-[#F13B2F] mt-[40px] text-white rounded">
          Registrasi
        </button>

        {/* Link Login */}
        <div className="gap-1 flex mt-[10px]">
          <p className="text-sm opacity-50">sudah punya akun? login</p>
          <button className="text-sm text-[#F13B2F] font-bold" onClick={() => navigate('/')}>
            disini
          </button>
        </div>
      </div>

      {/* Gambar Ilustrasi */}
      <div>
        <img className="w-screen h-screen" src="img/IllustrasiLogin.png" alt="Illustrasi" />
      </div>
    </div>
  );
};

export default Register;
