import Headers from "../Components/Headers";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { At } from '@phosphor-icons/react';

const EditProfile = () => {
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
    });
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();

    const handleEdit = async () => {
        const payload = {
            first_name: data.first_name,
            last_name: data.last_name,
        };

        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.put('https://take-home-test-api.nutech-integrasi.com/profile/update', payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    navigate('/akun');
                }
            }
        } catch (error) {
            console.log(error);
        }
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
                    console.log(response.data.data);
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
            <div className="flex justify-center w-full h-full">
                <div className="flex flex-col items-center gap-2 mt-5">
                    <img className="w-[80px] h-[80px]" src="img/Profile_Photo.png" alt="Profile" />
                    <h1 className="text-xl font-bold">{data.first_name} {data.last_name}</h1>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm">Email</p>
                            <div className="w-[400px] bg-zinc-300 gap-2  h-[40px] flex border border-grey-800 px-3 py-1 rounded items-center">
                                <At size={18} className="text-grey-800 opacity-50" />
                                <input
                                    value={data.email || ''}
                                    className="inactive bg-zinc-300  focus:outline-none w-full"
                                    type="email"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm">Nama Depan</p>
                            <div className="w-[400px] gap-2 h-[40px] flex border border-grey-800 px-3 py-1 rounded items-center">
                                <At size={18} className="text-grey-800 opacity-50" />
                                <input
                                    value={data.first_name || ''}
                                    className="inactive focus:outline-none w-full"
                                    type="text"
                                    onChange={(e) => setData({ ...data, first_name: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm">Nama Belakang</p>
                            <div className="w-[400px] gap-2 h-[40px] flex border border-grey-800 px-3 py-1 rounded items-center">
                                <At size={18} className="text-grey-800 opacity-50" />
                                <input
                                    value={data.last_name || ''}
                                    className="inactive focus:outline-none w-full"
                                    type="text"
                                    onChange={(e) => setData({ ...data, last_name: e.target.value })}
                                />
                            </div>
                        </div>
                        <button onClick={() => setOpen(true)} className="w-full bg-[#F13B2F] rounded text-white py-1">Simpan</button>
                    </div>
                </div>
            </div>

            {/* Modal Validasi */}
      {open && (
            <div className="flex flex-col gap-2 absolute top-0 left-0 w-full h-full p-5 bg-black bg-opacity-50">
              <div className="flex flex-col w-[300px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center gap-2 bg-white p-5 rounded">
                <img src="img/Logo.png" alt="" />
                <div className="flex gap-5 items-center justify-center flex-col">
                  <h1 className="text-sm">Anda yakin untuk menyimpan perubahan</h1>
                  <button className='text-[#F13B2F]' onClick={handleEdit}>
                    Ya, lanjutkan perubahan
                  </button>
                  <button className='opacity-50' onClick={() => setOpen(false) && navigate('/akun')}>batalkan</button>
                </div>
              </div>
            </div>
          )}
        </div>
    );
};

export default EditProfile;
