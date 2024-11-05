import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Resgister';
import Homepage from './Pages/Homepage';
import Topup from './Pages/Topup';
import Service from './Pages/Service';
import Transaction from './Pages/Transaction';
import Listrik from './Pages/Listrik';
import Akun from './Pages/Akun';
import EditProfile from './Pages/EditProfile';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/topup" element={<Topup />} />
        <Route path="/service" element={<Service />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/listrik" element={<Listrik />} />
        <Route path="/akun" element={<Akun />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
