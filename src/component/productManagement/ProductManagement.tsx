"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
export const seller = {
    id: '1',
    name: 'Gaurav Singh',
    image: '/placeholder.svg?height=50&width=50',
    verified: true,
}

interface Product {
    id: string;
    productName: string;
    productImage: string;
    price: number;
    description:string
    highPrice:number;
    averagePrice:number;
    moq:string;
    goodPrice:number;
    productId:number
}

interface ProductList {
    data: Product[];
}

export const products = [
    {
        id: '1',
        name: 'Almonds brown frig',
        weight: '10 Kg',
        highPrice: 10000,
        averagePrice: 8000,
        goodPrice: 6000,
        image: '/placeholder.svg?height=200&width=200',
        description: 'Lorem Ipsum is Simply Dummy Text Of The Printing And typesetting Industry. Standard Dummy Text Ever Since The 1500s.',
        averageQty: '₹ 10000.00/kg',
        goodQty: '₹ 12586.58/kg',
        highQty: '₹ 15000.00/kg',
        moq: '10 kg',
        totalOrders: 121,
        totalOrderQuantity: '1500kg'
    },
]


export default function ProductManagement() {
    const [filterOpens, setFilterOpens] = useState(false)
    const [categoryOpen, setCategoryOpen] = useState(false)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (categoryOpen && !(event.target as Element).closest('.relative')) {
                setCategoryOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [categoryOpen])

    const [productList, setProductList] = useState<ProductList>({ data: [] });


    // const [productList, setProductList] = useState<[]>([]); // Ensure productList is an array
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    // Function to fetch users for a specific page
    const fetchUsers = async (pageNumber: number) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-all-product-list`, {
                pageNumber,
                pageSize: 100,
                searchValue: null,
                userType: null,
            });
            console.log("=======", response?.data?.data)
            setProductList(response?.data?.data)
        } catch (error) {
            console.error("Error fetching users", error);
            return [];
        }
    };
    console.log("productList", productList)


    // Fetch users on component mount
    useEffect(() => {
        fetchUsers(1);
    }, []);

    const router = useRouter()


    const handleCheckboxChange = (productName: string) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(productName)
                ? prevSelected.filter((name) => name !== productName) // Remove if already selected
                : [...prevSelected, productName] // Add if not selected
        );
    };

    const filteredProducts = selectedProducts.length > 0
        ? productList?.data?.filter((product) => selectedProducts.includes(product.productName))
        : productList?.data;



    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 ml-4">Listed Products</h1>

            <div className="flex justify-between items-center gap-4 mb-6 m-4">

                <div className="relative flex  gap-2">
                    {/* <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                        </svg>
                        Filter By
                    </button>

                    {filterOpen && (
                        <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-lg shadow-lg border p-2 z-10">
                            <label className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCategory.length === 0}
                                    onChange={() => setSelectedCategory([])}
                                    className="rounded border-gray-300"
                                />
                                All
                            </label>

                            <label className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCategory.includes('Supplier')}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedCategory([...selectedCategory, 'Supplier'])
                                        } else {
                                            setSelectedCategory(selectedCategory.filter(c => c !== 'Supplier'))
                                        }
                                    }}
                                    className="rounded border-gray-300"
                                />
                                Low to High
                            </label>

                            <label className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCategory.includes('Retailer')}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedCategory([...selectedCategory, 'Retailer'])
                                        } else {
                                            setSelectedCategory(selectedCategory.filter(c => c !== 'Retailer'))
                                        }
                                    }}
                                    className="rounded border-gray-300"
                                />
                                High to Low
                            </label>

                            <button
                                onClick={() => setCategoryOpen(false)}
                                className="w-full mt-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Apply Filter
                            </button>
                        </div>
                    )} */}


                    <button
                        onClick={() => setFilterOpens(!filterOpens)}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                        </svg>
                        Filter By Product
                    </button>

                    {filterOpens && (
                        <div className="absolute top-full left-32 mt-1 w-60 bg-white rounded-lg shadow-lg border p-2 z-10">
                            <div className="max-h-60 overflow-y-auto">
                                {productList.data?.length > 0 ? (
                                    productList.data?.map((product) => (
                                        <label key={product.id} className="flex items-center gap-2 py-1">
                                            <input
                                                type="checkbox"
                                                checked={selectedProducts.includes(product.productName)}
                                                onChange={() => handleCheckboxChange(product.productName)}
                                            />
                                            {product.productName}
                                        </label>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No products available.</p>
                                )}
                            </div>
                        </div>
                    )}

                </div>

                <div className="flex gap-2 justify-center items-center">
                    {/* <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                        Export
                       
                    </button> */}
                    <h2 className='font-bold text-lg text-slate-700'>No of Products: {productList?.data?.length}</h2>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MOQ</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">High Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Good Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredProducts?.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className=" w-10 flex-shrink-0 rounded-full">
                                            <img
                                                src={product?.productImage}
                                                alt={product.productName}
                                                width={40}
                                                height={40}
                                                className="rounded-full h-10 border"
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{product.productName}</div>
                                            <div className="text-sm font-medium text-gray-900">{product.description.slice(0, 30)}..</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.moq || "no data"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ₹ {product.highPrice || "no price"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ₹ {product.averagePrice || "no price"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ₹ {product.goodPrice || "no price"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm cursor-pointer text-blue-500" onClick={() => router.push(`/product-management/${product.productId}`)}> View
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <div className="flex justify-between items-center my-6 pt-6 border-t">
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
            </div> */}
        </div>
    )
}

