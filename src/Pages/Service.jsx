import Headers from "../Components/Headers";
import ProfileSaldo from "../Components/ProfilSaldo";
import axios from "axios";
import { useEffect, useState } from "react";

const Service = () => {
    const [data, setData] = useState([]);

    const formatMoney = (value) => {
        // Menghapus karakter non-digit dan menambahkan pemisah ribuan
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const getService = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get('https://take-home-test-api.nutech-integrasi.com/services', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    console.log(response.data.data);
                    setData(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        }
    };

    useEffect(() => {
        getService();
    }, []);

    return (
        <div className="mb-[70px]">
            <Headers />
            <ProfileSaldo />
            <div className="flex gap-10 mt-[40px] ml-[160px]">
                <div>
                    <h1 className=" text-lg mb-5">Semua Service</h1>
                    <div className="grid grid-cols-2 gap-5">
                        {data.map((service, index) => (
                            <div key={index} className="bg-white flex flex-col rounded-lg w-[450px] gap-5 p-4 px-6 border-2">
                                <img className="w-[50px] rounded-full" src={service.service_icon} alt="icon" />
                                <div>
                                    <p>Kode: {service.service_code}</p>
                                    <p>Nama: {service.service_name}</p>
                                    <p>Harga: Rp {formatMoney(service.service_tariff)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;
