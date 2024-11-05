
import Headers from '../Components/Headers';
import Icon from '../Components/Icon';
import ProfileSaldo from '../Components/ProfilSaldo';
import PromoBanner from '../Components/PromoBanner';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Silahkan Login terlebih dahulu');
    navigate('/');
    return
  }


  return (
    <div className="h-[700px]">
      <Headers />
      <ProfileSaldo /> 
      <Icon />
      <PromoBanner />
    </div>
  );
};

export default Homepage;
