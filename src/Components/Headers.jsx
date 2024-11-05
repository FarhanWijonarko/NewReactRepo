import { useNavigate, useLocation } from 'react-router-dom';

const Headers = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isTopUpPage = location.pathname === '/topup';
  const isTransactionPage = location.pathname === '/transaction';
  const isAccountPage = location.pathname === '/akun';
  const isServicePage = location.pathname === '/service';


  return (
    <div className="flex w-full h-[70px] justify-between items-center px-[150px] border-b">
      <button onClick={() => navigate('/homepage')} className="flex gap-2 p-2 items-center">
        <img src="img/logo.png" alt="logo" />
        <h1 className="font-bold">SIMS PPOB</h1>
      </button>
      <div className="flex gap-10 p-2 items-center relative">
        <button
          className={`text-sm font-bold hover:text-[#F13B2F] ${isTopUpPage ? 'text-[#F13B2F]' : 'text-black'}`}
          onClick={() => navigate('/topup')}
        >
          Top Up
        </button>
        <button
          className={`text-sm font-bold hover:text-[#F13B2F]  ${isServicePage ? 'text-[#F13B2F]' : 'text-black'}`}
          onClick={() => navigate('/service')}
        >
          Service
        </button>
        <button
          className={`text-sm font-bold hover:text-[#F13B2F]  ${isTransactionPage ? 'text-[#F13B2F]' : 'text-black'}`}
          onClick={() => navigate('/transaction')}
        >
          Transaction
        </button>
        <button
          className={`text-sm font-bold hover:text-[#F13B2F]  ${isAccountPage ? 'text-[#F13B2F]' : 'text-black'}`}
          onClick={() => navigate('/akun')}
        >
          Akun
        </button>
      </div>
    </div>
  );
};

export default Headers;
