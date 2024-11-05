import { useState, useEffect } from 'react';
import Headers from '../Components/Headers';
import ProfileSaldo from '../Components/ProfilSaldo';
import { CreditCard, CheckCircle, XCircle } from '@phosphor-icons/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Listrik = () => {
  const [amount, setAmount] = useState('');
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [toggleBayar, setToggleBayar] = useState(false);
  const [notificationGagal, setNotificationGagal] = useState(false);
  const navigate = useNavigate();

  const formatMoney = (value) => {
    // Menghapus karakter non-digit
    const numberString = value.replace(/\D/g, '');
    // Menambahkan pemisah ribuan
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatMoney(inputValue);
    setAmount(formattedValue); // Mengupdate dengan format uang
  };

  const Pembayaran = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const ress = await axios.post('https://take-home-test-api.nutech-integrasi.com/transaction', {
                service_code: Number(amount),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (ress.status === 200) {
                console.log('Top up berhasil');
                setNotification(true);
            } else {
                setNotificationGagal(true);
                console.log('Top up gagal');
            }
        } catch (error) {
          setNotificationGagal(true);
        }
    }
};

  const handleBackToHome = () => {
    setNotification(false);
    navigate('/homepage'); // Navigasi ke homepage
  };

  useEffect(() => {
    setToggleBayar(amount !== '' && Number(amount.replace(/,/g, '')) > 0);
  }, [amount]); 
  return (
    <div className="flex flex-col w-screen h-screen">
      <Headers />
      <ProfileSaldo />
      <div className="flex flex-col gap-2 mt-[40px] ml-[160px] w-[250px]">
        <h1 className='text-lg'>PemBayaran</h1>
        <div className='flex gap-3 items-center'>
          <img className='w-[30px]' src="img/icon/Listrik.png" alt="Listrik" />
          <p>Listrik Prabayar</p>
        </div>
      </div>
      <div className="flex gap-5 items-center mt-7">
        <div className="flex w-[750px] flex-col gap-1">
          <div className="border w-full h-[40px] ml-[160px] items-center flex gap-5 rounded">
            <CreditCard className="ml-[20px]" size={25} />
            <input
              className="w-full h-full px-3 inactive focus:outline-none"
              type="text" // Menggunakan type text untuk penanganan format
              onChange={handleChange}
              value={amount}
              placeholder='Masukan Nominal Top Up'
            />
          </div>
          {toggleBayar ? (
  <button
  onClick={() => setOpen(true)}
    className="border w-[600px] h-[40px] text-white ml-[160px] justify-center items-center mt-[20px] bg-[#F13B2F] rounded flex"
  >
    Bayar
  </button>
) : (
  <button
  disabled
    className="border w-[600px] h-[40px] text-white ml-[160px] justify-center items-center mt-[20px] bg-zinc-400 rounded flex"
  >
    Bayar
  </button>
)}
        </div>
      </div>


      {/* Modal Top Up */}
      {open && (
            <div className="flex flex-col gap-2 absolute top-0 left-0 w-full h-full p-5 bg-black bg-opacity-50">
              <div className="flex flex-col w-[300px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center gap-2 bg-white p-5 rounded">
                <img src="img/Logo.png" alt="" />
                <div className="flex gap-5 items-center justify-center flex-col">
                  <h1 className="text-sm">Beli listrik prabayar senilai</h1>
                  <h1 className="text-xl font-bold">Rp {amount} ?</h1>
                  <button className='text-[#F13B2F]' onClick={Pembayaran}>
                    Ya, lanjutkan bayar
                  </button>
                  <button className='opacity-50' onClick={() => setOpen(false)}>batalkan</button>
                </div>
              </div>
            </div>
          )}


          {/* Modal Notifikasi */}
          {notification && (
            <div className="flex flex-col gap-2 absolute top-0 left-0 w-full h-full p-5 bg-opacity-50">
              <div className="flex flex-col w-[300px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center gap-2 bg-white p-5 rounded">
              <CheckCircle className="text-green-600" size={32} />
                <div className="flex gap-5 items-center justify-center flex-col">
                  <h1 className="text-sm">Pembayaran listrik prabayar sebesar</h1>
                  <h1 className="text-xl font-bold">Rp{amount}</h1>
                  <h1 className="text-sm">berhasil</h1>
                  <button className='text-[#F13B2F]' onClick={handleBackToHome}>
                    Kembali ke Beranda
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Modal Notifikasi gagal */}
          {notificationGagal && (
            <div className="flex flex-col gap-2 absolute top-0 left-0 w-full h-full p-5 bg-opacity-50">
              <div className="flex flex-col w-[300px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center gap-2 bg-white p-5 rounded">
              <XCircle  className="text-[#F13B2F]" size={32} />
                <div className="flex gap-5 items-center justify-center flex-col">
                  <h1 className="text-sm">Pembayaran listrik prabayar sebesar</h1>
                  <h1 className="text-xl font-bold">Rp{amount}</h1>
                  <h1 className="text-sm">gagal</h1>
                  <button className='text-[#F13B2F]' onClick={handleBackToHome}>
                    Kembali ke Beranda
                  </button>
                </div>
              </div>
            </div>
          )}
    </div>
  );
};

export default Listrik;
