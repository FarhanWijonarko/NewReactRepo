import axios from 'axios';
import { useEffect, useState } from 'react';

const ProfileSaldo = () => {
  const [data, setData] = useState({});
  const [balance, setBalance] = useState(0);
  const [isSaldodVisible, setIsSaldodVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsSaldodVisible(!isSaldodVisible);
  };

  // Ambil data profil dari API
  const ambilData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const ress = await axios.get('https://take-home-test-api.nutech-integrasi.com/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (ress.status === 200) {
          setData(ress.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const AmbilBalance = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const ress = await axios.get('https://take-home-test-api.nutech-integrasi.com/balance', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (ress.status === 200 && ress.data && ress.data.data) {
          setBalance(ress.data.data.balance);
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    }
  };

  useEffect(() => {
    ambilData();
    AmbilBalance();
  }, []);

  const formatMoney = (value) => {
    // Menghapus karakter non-digit dan menambahkan pemisah ribuan
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="flex gap-10 p-2 justify-between px-[160px] mt-10">
      <div className='w-[500px]'>
        <img className="w-[70px] h-[70px] rounded-full" src="./img/Profile_Photo.png" alt="profile_image" />
        <h1 className="mt-4 text-xl">Selamat datang, </h1>
        <h1 className="font-bold text-3xl">
          {data.first_name} {data.last_name}
        </h1>
      </div>
      <div>
        <img className="w-[750px] h-[150px]" src="img/Background_Saldo.png" alt="" />
        <div className="flex flex-col w-[450px] h-[100px] absolute top-[138px] right-[240px] gap-3">
          <h1 className="text-lg text-white ml-2">Saldo anda</h1>
          <div className="flex ml-2 text-3xl text-white gap-2 font-bold">
            <p>Rp</p>
            <input
              type={isSaldodVisible ? 'text' : 'password'}
              value={formatMoney(balance)} // Menggunakan formatMoney untuk memformat saldo
              className="text-white font-bold bg-transparent border-none focus:outline-none"
              readOnly
            />
          </div>
          {
            isSaldodVisible ? (
<button onClick={togglePasswordVisibility} className="text-xs w-[70px] h-[40px] text-white">sembunyikan</button>
            ) : (
<button onClick={togglePasswordVisibility} className="text-xs w-[70px] h-[40px] text-white">lihat saldo</button>
)
          }
          
        </div>
      </div>
    </div>
  );
};

export default ProfileSaldo;
