import { useNavigate } from "react-router-dom";


const Icon = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-center-10 py-[60px] px-[160px] gap-10">
      <div className=" flex flex-col w-[75px] h-[100px] gap-2">
        <img className="w-10" src="img/icon/PBB.png" alt="" />
        <h1 className="text-sm text-center">PBB</h1>
      </div>
      <button onClick={() => navigate('/listrik')} className=" flex flex-col w-[75px] items-center h-[100px] gap-2">
        <img className="w-10" src="img/icon/Listrik.png" alt="" />
        <h1 className="text-sm text-center">listrik</h1>
      </button>
      <div className=" flex flex-col w-[75px] items-center h-[100px] gap-2">
        <img className="w-10" src="img/icon/Pulsa.png" alt="" />
        <h1 className="text-sm text-center">Pulsa</h1>
      </div>
      <div className=" flex flex-col w-[75px] items-center h-[100px] gap-2">
        <img className="w-10" src="img/icon/PDAM.png" alt="" />
        <h1 className="text-sm text-center">PDAM</h1>
      </div>
      <div className=" flex flex-col w-[75px] items-center h-[100px] gap-2">
        <img className="w-10" src="img/icon/PGN.png" alt="" />
        <h1 className="text-sm text-center">PGN</h1>
      </div>
      <div className=" flex flex-col w-[75px] items-center h-[100px] gap-2">
        <img className="w-10" src="img/icon/Televisi.png" alt="" />
        <h1 className="text-sm text-center">TV Langganan</h1>
      </div>
      <div className=" flex flex-col w-[75px] items-center h-[100px] gap-2">
        <img className="w-10" src="img/icon/Musik.png" alt="" />
        <h1 className="text-sm text-center">Musik</h1>
      </div>
      <div className=" flex flex-col w-[75px] items-center h-[100px] gap-2">
        <img className="w-10" src="img/icon/Game.png" alt="" />
        <h1 className="text-sm text-center">Voucher Game</h1>
      </div>
      <div className=" flex flex-col w-[75px] items-center h-[100px] gap-2">
        <img className="w-10" src="img/icon/Voucher Makanan.png" alt="" />
        <h1 className="text-sm text-center">Voucher Makanan</h1>
      </div>
      <div className=" flex flex-col w-[75px] items-center h-[100px] gap-2">
        <img className="w-10" src="img/icon/Kurban.png" alt="" />
        <h1 className="text-sm text-center">Kurban</h1>
      </div>
      <div className=" flex flex-col w-[75px] items-center h-[100px] gap-2">
        <img className="w-10" src="img/icon/Zakat.png" alt="" />
        <h1 className="text-sm text-center">Zakat</h1>
      </div>
      <div className=" flex flex-col w-[75px] items-center h-[100px] gap-2">
        <img className="w-10" src="img/icon/Paket Data.png" alt="" />
        <h1 className="text-sm text-center">Paket Data</h1>
      </div>
    </div>
  );
};
export default Icon;
