'use client'

import Image from 'next/image'
import File from '../../assets/profile_user.jpg'
import { LineChart } from '../chart/line-chart'
import { useEffect, useState } from 'react'


const handleRedirect = (category:string) => {
    if (typeof window !== "undefined") {
        window.location.href = (`/product-details?category=${encodeURIComponent(category)}`)
    }
};

type Props = {
    id: string
}

export const ProfileSidebar: React.FC<Props> = ({ id }) => {

    // export default function ProfileSidebar() {
    const [user, setUser] = useState<any>("seller")

    const [loading, setLoading] = useState<boolean>(true);

    console.log("iddddddd", id)


    useEffect(() => {
        // Fetch user data based on customId
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-user-single?customId=${id}`);
                const data = await response.json();

                if (data.success) {
                    setUser(data.data); // Set user data to state
                } else {
                    console.error('User not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchUserData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }


    const stats = [
        { title: 'Products', value: user?.Product?.length ?? 0 },
        { title: 'Enquiries Received', value: user?.OrderDetails?.length },
        // url: 'product-details'
        { title: 'Enquiries Confirmed', value: user?.OrderDetails[0]?.statusId === 4 ? user?.OrderDetails[0]?.statusId?.length : 0 },
        { title: 'Purchase Enquiry', value: user?.OrderDetails[0]?.statusId === 4 ? user?.OrderDetails[0]?.statusId?.length : 0 },
        { title: 'Purchase Completed', value: user?.OrderDetails[0]?.statusId === 4 ? user?.OrderDetails[0]?.statusId?.length : 0 },
    ];

    return (
        <div className="grid">
            {/* Main Content */}

            {user?.customId?.includes("SU") ? (
                <div className="grid">
                    {/* Main Content */}
                    <div className="flex grid-cols-2">
                        {/* Sidebar */}
                        <div className='w-[25%] p-1'>
                            <div className="col-span-4 bg-white p-5 rounded-lg shadow border">
                                <div className='flex items-center justify-center'>
                                    {user?.filePath ? (
                                        <img
                                            src={user?.filePath}
                                            alt="Profile Picture"
                                            width={80}
                                            height={80}
                                            className="rounded-full"
                                        />
                                    ) : (
                                        <Image
                                            src={File}
                                            alt="Profile Picture"
                                            width={80}
                                            height={80}
                                            className="rounded-full"
                                        />
                                    )}


                                </div>
                                <div className='flex gap-2 my-5 items-center justify-center'>

                                    <h3 className="text-xl font-semibold">{user?.businessName}</h3>

                                    <p className="text-blue-600 text-xs bg-blue-100 px-2 py-1 rounded">
                                        Supplier
                                    </p>
                                </div>


                                <div className="flex flex-col space-y-4">
                                    <div className="space-y-2 text-sm">
                                        <p><strong>User ID:</strong> {user?.customId}</p>
                                        <p><strong>Join Date:</strong> {user?.createdAt}</p>
                                        <p><strong>Contact:</strong> (+91)-{user?.phone}</p>
                                        <p><strong>Address:</strong> {user?.city}, {user.state}</p>
                                        <p><strong>GST NO:</strong> {user?.gst}</p>
                                    </div>
                                    <img src={user?.qrCodeSelf} alt='qr' width={500} height={300} />

                                    {/* <div className="flex gap-2 mt-4">
                                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">Edit</button>
                                        <button className="border border-gray-300 px-3 py-1 rounded text-xs">Share</button>
                                        <div className="text-red-600 text-xs bg-red-100 px-4 py-2 rounded">
                                            Suspended
                                        </div>
                                    </div> */}

                                </div>
                            </div>

                        </div>

                        <div className="col-span-8 p-1">

                            {/* Stats */}
                            <div className="col-span-8 grid grid-cols-5 gap-4 h-20">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-white border p-4 rounded-lg shadow flex flex-col items-center justify-center text-center"
                                    >
                                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                                        <p className="text-sm text-gray-600">{stat.title}</p>
                                        <button className="text-blue-600 text-sm mt-2"
                                            // onClick={() => window.location.href = '/product-details'}

                                            onClick={() => handleRedirect(stat.title)}
                                        >View all →</button>
                                    </div>
                                ))}
                            </div>

                            {/* Activity Chart */}
                            <div className="bg-white p-6 rounded-lg shadow mt-16 border">
                                <h3 className="text-lg font-semibold mb-4">Active Time</h3>
                                <div>            <LineChart />
                                </div>
                            </div>

                            {/* Retailers Table */}
                            <div className="bg-white p-6 rounded-lg shadow mt-4 border">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">Connected Retailers</h3>
                                    <div className="flex gap-2">
                                        <input
                                            type="search"
                                            placeholder="Search..."
                                            className="border rounded px-3 py-1 text-sm"
                                        />
                                        <button className="bg-gray-200 px-4 py-1 rounded">Export</button>
                                    </div>
                                </div>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="py-2 text-left">USER</th>
                                            <th className="py-2 text-left">USER ID</th>
                                            <th className="py-2 text-left">BUSINESS</th>
                                            <th className="py-2 text-left">GST</th>
                                            <th className="py-2 text-center">SHOP MARKA</th>

                                            {/* <th className="py-2 text-center">ACTION</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user?.retailers.map((retailer: any) => (
                                            <tr key={retailer.id} className="border-b">
                                                <td className="py-2 text-left">{retailer.businessName}</td>
                                                <td className="py-2 text-left">{retailer.customId}</td>
                                                <td className="py-2 text-left">{retailer.businessOwner}</td>
                                                <td className="py-2 text-left">{retailer.gstNumber}</td>
                                                <td className="py-2 text-center">{retailer.shopMarka}</td>


                                                {/* <td className="py-2 text-center">
                        <button className="text-blue-600">View</button>
                    </td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>
            ) : (
                <div className="grid">
                    <div className="flex grid-cols-2">
                        {/* Profile Sidebar */}
                        <div className='w-[25%] p-1'>
                            <div className="col-span-4 bg-white p-5 rounded-lg shadow border">
                                <div className='flex items-center justify-center'>
                                    {user?.filePath ? (
                                        <img
                                            src={user?.filePath}
                                            alt="Profile Picture"
                                            width={80}
                                            height={80}
                                            className="rounded-full"
                                        />
                                    ) : (
                                        <Image
                                            src={File}
                                            alt="Profile Picture"
                                            width={80}
                                            height={80}
                                            className="rounded-full"
                                        />
                                    )}

                                </div>
                                <div className='flex gap-2 my-5 items-center justify-center'>
                                    <h3 className="text-xl font-semibold">{user?.businessName}</h3>
                                    <p className="text-blue-600 text-xs bg-blue-100 px-2 py-1 rounded">
                                        Retailer
                                    </p>
                                </div>

                                <div className="flex flex-col space-y-4">
                                    <div className="space-y-2 text-sm">
                                        <p><strong>User ID:</strong> {user?.customId}</p>
                                        <p><strong>Join Date:</strong> {user?.createdAt}</p>
                                        <p><strong>Contact:</strong> (+91)-{user?.phone}</p>
                                        <p><strong>Address:</strong> {user?.city}, {user.state}</p>
                                        <p><strong>GST NO:</strong> {user?.gst}</p>
                                    </div>
                                    <img src={user?.qrCode} alt='qr' width={500} height={300} />
                                    {/* 
                                    
                                    <div className="flex gap-2">
                                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">Edit</button>
                                        <button className="border border-gray-300 px-3 py-1 rounded text-xs">Share</button>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="col-span-8 p-1 w-[75%]">
                            <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow border">
                                <div className="space-y-1">
                                    <p className="text-2xl font-semibold">{user?.OrderDetails?.length}</p>
                                    <p className="text-base text-green-600">Purchase Enquiry</p>
                                </div>
                                <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                                    View all
                                    <svg
                                        className="ml-1 h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow border mt-2">
                                <div className="space-y-1">
                                    <p className="text-2xl font-semibold">{user?.OrderDetails?.length}</p>
                                    <p className="text-base text-green-600">Purchase Enquiry</p>
                                </div>
                                <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                                    View all
                                    <svg
                                        className="ml-1 h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>


                            {/* Activity Chart */}
                            <div className="bg-white p-6 rounded-lg shadow mt-2 border">
                                <h3 className="text-lg font-semibold mb-4">Active App Time</h3>
                                <div>
                                    <LineChart />
                                </div>
                            </div>

                            {/* Connected Supplier */}
                            <div className="bg-white p-6 rounded-lg shadow mt-4 border">
                                <h3 className="text-lg font-semibold mb-4">Connected Supplier</h3>
                                <div className="flex items-center gap-4 p-4 border rounded-lg">
                                    {user?.filePath ? (
                                        <img
                                            src={user?.filePath}
                                            alt="Profile Picture"
                                            width={80}
                                            height={80}
                                            className="rounded-full"
                                        />
                                    ) : (
                                        <Image
                                            src={File}
                                            alt="Profile Picture"
                                            width={80}
                                            height={80}
                                            className="rounded-full"
                                        />
                                    )}
                                    <div>
                                        <h4 className="font-semibold">{user?.seller?.businessName}</h4>
                                        <p className="text-sm text-gray-600">{user?.seller?.businessOwner}</p>
                                    </div>
                                    {/* <button className="ml-auto text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}