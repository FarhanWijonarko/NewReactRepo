import { CaretRight, CaretLeft } from '@phosphor-icons/react';
import { useRef } from 'react';

const PromoBanner = () => {
  const containerRef = useRef(null);

  const handleSlideRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  };

  const handleSlideLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col -mt-10 px-[160px] gap-5 relative">
      <h1 className="font-bold">Temukan promo menarik</h1>
      <div className="flex gap-4 overflow-x-scroll scrollbar-hide" ref={containerRef}>
        <img src="img/Promo/Banner 1.png" alt="promo" />
        <img src="img/Promo/Banner 2.png" alt="promo" />
        <img src="img/Promo/Banner 3.png" alt="promo" />
        <img src="img/Promo/Banner 4.png" alt="promo" />
        <img src="img/Promo/Banner 5.png" alt="promo" />
      </div>

      <button onClick={handleSlideLeft} className="absolute left-[100px] top-[65%] transform -translate-y-[50%] bg-gray-200 p-2 rounded-full">
        <CaretLeft size={24} />
      </button>

      <button onClick={handleSlideRight} className="absolute right-[100px] top-[65%] transform -translate-y-[50%] bg-gray-200 p-2 rounded-full">
        <CaretRight size={24} />
      </button>
    </div>
  );
};

export default PromoBanner;
