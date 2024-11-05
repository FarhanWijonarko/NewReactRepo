import Headers from "../Components/Headers";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { At } from '@phosphor-icons/react';

const Akun = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token_expiration');
        navigate('/');
    };

    const ambilData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get('https://take-home-test-api.nutech-integrasi.com/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    setData(response.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        ambilData();
    }, []);

    return (
        <div>
            <Headers />
            <div className="flex justify-center w-[100%] h-[100%]">
                <div className="flex flex-col items-center gap-2 mt-5">
                    <img className="w-[80px] h-[80px]" src="img/Profile_Photo.png" alt="Profile" />
                    <h1 className="text-xl font-bold">{data.first_name} {data.last_name}</h1>
                    <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm">Email</p>
                        <div className="w-[400px] bg-zinc-300 h-[40px] items-center gap-4 flex border border-grey-800 px-3 py-1 rounded">
                        <At size={18} className="text-grey-800 opacity-50" />
                            <input
                                value={data.email || ''}
                                className="inactive bg-zinc-300 focus:outline-none w-full"
                                type="email"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm">Nama Depan</p>
                        <div className="w-[400px] bg-zinc-300 h-[40px] items-center gap-4 flex border border-grey-800 px-3 py-1 rounded">
                        <At size={18} className="text-grey-800 bg-zinc-300 opacity-50" />
                            <input
                                value={data.first_name || ''}
                                className="inactive bg-zinc-300 focus:outline-none w-full"
                                type="text"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm">Nama Belakang</p>
                        <div className="w-[400px] bg-zinc-300 h-[40px] items-center gap-4 flex border border-grey-800 px-3 py-1 rounded">
                        <At size={18} className="text-grey-800 opacity-50" />
                            <input
                                value={data.last_name || ''}
                                className="inactive focus:outline-none bg-zinc-300 w-full"
                                type="text"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                    <button onClick={() => navigate('/editprofile')} className="w-full bg-[#F13B2F] rounded text-white py-1">Edit Profile</button>
                    <button onClick={handleLogout} className="w-full bg-white border border-[#F13B2F] rounded text-[#F13B2F] py-1">Logout</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Akun;
