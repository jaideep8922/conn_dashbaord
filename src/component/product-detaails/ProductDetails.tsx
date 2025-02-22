'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Profile from '../../assets/profile_user.jpg'
import Pista from '../../assets/pista.jpg'

interface Item {
    id: string;
    name: string;
    imageUrl: string;
    description:string;
    price:string
    amount?:number;
    date?:string;
    totalQty?:number;
    totalItem?:number
    status?:string                                  
  }

export default function ProductDetails() {
    const searchParams = useSearchParams()
    const [activeData, setActiveData] = useState<[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const category = searchParams.get('category')

    const data = {
        "Enquiries Received": [
            { id: 1, name: "John Doe", amount: 1000, status: "Pending", date: '20-04-2024', totalQty: "200", totalItem: '200' },
            { id: 2, name: "Jane Smith", amount: 1200, status: "Pending", date: '20-04-2024', totalQty: "200", totalItem: '200' },
            { id: 3, name: "Jane Smith", amount: 1200, status: "Pending", date: '20-04-2024', totalQty: "200", totalItem: '200' },
            { id: 4, name: "Jane Smith", amount: 1200, status: "Pending", date: '20-04-2024', totalQty: "200", totalItem: '200' },
            { id: 5, name: "Jane Smith", amount: 1200, status: "Pending", date: '20-04-2024', totalQty: "200", totalItem: '200' },
            { id: 6, name: "Jane Smith", amount: 1200, status: "Pending", date: '20-04-2024', totalQty: "200", totalItem: '200' },
            { id: 7, name: "Jane Smith", amount: 1200, status: "Pending", date: '20-04-2024', totalQty: "200", totalItem: '200' },
            { id: 8, name: "Jane Smith", amount: 1200, status: "Pending", date: '20-04-2024', totalQty: "200", totalItem: '200' },
            { id: 9, name: "Jane Smith", amount: 1200, status: "Pending", date: '20-04-2024', totalQty: "200", totalItem: '200' },

        ],
        "Enquiries Confirmed": [
            { id: 3, name: "Alice Johnson", amount: 2000, status: "Confirmed", date: '20-04-2024', totalQty: "200", totalItem: '200' },
            { id: 4, name: "Bob Brown", amount: 1800, status: "Confirmed", date: '20-04-2024', totalQty: "200", totalItem: '200' },
        ],
        "Purchase Enquiry": [
            { id: 5, name: "Charlie Green", amount: 1500, status: "In Progress", date: '20-04-2024', totalQty: "200", totalItem: '200' },
            { id: 6, name: "Diana White", amount: 1700, status: "In Progress", date: '20-04-2024', totalQty: "200", totalItem: '200' },
        ],
        "Purchase Order Completed": [
            { id: 7, name: "Edward Black", amount: 3000, status: "Completed", date: '20-04-2024', totalQty: "200", totalItem: '200' },
            { id: 8, name: "Fiona Grey", amount: 3500, status: "Completed", date: '20-04-2024', totalQty: "200", totalItem: '200' },
        ],
        "Products": [
            { id: 1, name: "Product 1", imageUrl: Pista, price: "₹1000", description: "Description of product 1" },
            { id: 2, name: "Product 2", imageUrl: Pista, price: "₹1200", description: "Description of product 2" },
            { id: 3, name: "Product 3", imageUrl: Pista, price: "₹1500", description: "Description of product 3" },
            { id: 4, name: "Product 4", imageUrl: Pista, price: "₹2000", description: "Description of product 4" },
            { id: 5, name: "Product 5", imageUrl: Pista, price: "₹2500", description: "Description of product 5" },
            { id: 6, name: "Product 6", imageUrl: Pista, price: "₹3000", description: "Description of product 6" },
        ],
    };

    useEffect(() => {
        if (category && data[category]) {
            setActiveData(data[category])
        }
    }, [category, data])

    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-blue-100 text-blue-800'
            case 'confirmed':
                return 'bg-green-100 text-green-800'
            case 'completed':
                return 'bg-orange-500 text-white'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="grid">
            
                <div className="flex items-center mt-3 justify-between px-4 py-5 bg-white border shadow-md rounded-xl">
                    <div className="flex items-center gap-4 ">
                        <button
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-5 h-5"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </button>
                        <div className="flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-5 h-5 text-gray-600"
                            >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            <span className="text-lg font-medium">{category || 'Enquiries'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-blue-600 font-medium">578</span>
                        <button className="text-gray-600 hover:text-gray-900">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-5 h-5"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 w-full">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">

                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <input
                                type="search"
                                placeholder="Search..."
                                className="px-4 py-2 w-[300px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            // value={search}
                            // onChange={(e) => setSearch(e.target.value)}
                            />
                            <div className="relative">
                                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                                    Export
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mx-3'>

                    {category === "Products" ? (
                        <div className="grid grid-cols-4 gap-4 mt-0">
                            {(activeData as Item[])?.map((item) => (
                                <div key={item.id} className="bg-white border shadow-lg rounded-lg p-4 flex flex-col">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        width={1000}
                                        height={150}
                                        className="rounded-lg"
                                    />
                                    <div className="mt-2 text-start">
                                        <h3 className="text-md font-bold">{item.name}</h3>
                                        <p className="text-xs text-gray-500">{item.description}</p>
                                        <div className="space-y-2">
                                            {/* Average Price */}
                                            <div className="flex items-center justify-between text-sm mt-2">
                                                <span className="text-gray-500">Average :</span>
                                                <span className="font-medium">{item.price}</span>
                                            </div>

                                            {/* Good Price */}
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Good :</span>
                                                <span className="font-medium">{item.price}</span>
                                            </div>

                                            {/* High Price */}
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">High :</span>
                                                <span className="font-medium">{item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto mt-6">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="text-left text-xs text-gray-500 border-b">
                                            <th className="pb-3 font-medium">ORDER ID</th>
                                            <th className="pb-3 font-medium">RECEIVED FROM</th>
                                            <th className="pb-3 font-medium">AMOUNT</th>
                                            <th className="pb-3 font-medium">DATE & TIME</th>
                                            <th className="pb-3 font-medium">TOTAL QTY</th>
                                            <th className="pb-3 font-medium">TOTAL ITEM</th>
                                            <th className="pb-3 font-medium">STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(activeData as Item[])?.map((item) => (
                                            <tr key={item.id} className="border-b last:border-b-0">
                                                <td className="py-4">{item.id}</td>
                                                <td className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        <Image
                                                            src={Profile}
                                                            alt={item.name}
                                                            width={20}
                                                            height={20}
                                                            className="rounded-full"
                                                        />
                                                        <span>{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4">{item.amount}</td>
                                                <td className="py-4">{item.date}</td>
                                                <td className="py-4">{item.totalQty}</td>
                                                <td className="py-4">{item.totalItem}</td>
                                                <td className="py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-between items-center my-6 pt-6 border-t">
                                <span className="text-sm text-gray-600">Showing 1 to 10 of 78 entries</span>
                                <div className="flex gap-2">
                                    <button
                                        className="px-3 py-1 border rounded hover:border-blue-500 hover:text-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </button>
                                    {[1, 2, 3, 4, 5].map((page) => (
                                        <button
                                            key={page}
                                            className={`px-3 py-1 border rounded hover:border-blue-500 hover:text-blue-500 ${currentPage === page ? 'bg-blue-500 text-white' : ''
                                                }`}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button className="px-3 py-1 border rounded hover:border-blue-500 hover:text-blue-500">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>

                    )}


                </div>
            
        </div>
    )
}
