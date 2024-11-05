import Headers from "../Components/Headers";
import ProfileSaldo from "../Components/ProfilSaldo";
import axios from "axios";
import { useEffect, useState } from "react";

const Transaction = () => {
    const [data, setData] = useState([]);

    const formatMoney = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const getService = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get('https://take-home-test-api.nutech-integrasi.com/transaction/history', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    console.log(response.data.data.records);
                    setData(response.data.data.records); // Set the state with the records array
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
                    <h1 className=" text-lg mb-5">Semua Transaksi</h1>
                    <div className="grid grid-cols-1 gap-5">
                        {data.map((transaction) => (
                            <div key={transaction.invoice_number} className="bg-white flex flex-col rounded-lg w-[750px] gap-5 p-4 px-6 border-2">
                                <div className="flex justify-between">
                                    <div>
                                        
                                        {
                                            transaction.transaction_type === 'TOPUP' ? (
                                                <p className={`font-bold text-lg text-green-500`}>
                                            + Rp {formatMoney(transaction.total_amount)}
                                        </p>
                                            ) : (
                                                <p className="text-red-500 font-bold text-lg">
                                                    - Rp {formatMoney(transaction.total_amount)}
                                                </p>
                                            )
                                        }
                                        
                                        <p className="text-sm opacity-50">
                                            {new Date(transaction.created_on).toLocaleString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false,
                                                timeZone: 'Asia/Jakarta', // Ensuring it's in WIB
                                            })} WIB
                                        </p>
                                    </div>
                                    <p className="text-sm opacity-50">{transaction.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transaction;
