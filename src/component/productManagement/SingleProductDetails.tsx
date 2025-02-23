
"use client"

import Image from 'next/image'
import Link from 'next/link'
import User from '../../assets/profile_user.jpg'
import { useEffect, useState } from 'react'

export const seller = {
    id: '1',
    name: 'Gaurav Singh',
    image: User,
    verified: true,
}


type Props = {
    id: string
}

export const ProductDetail: React.FC<Props> = ({ id }) => {

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-product-single?productId=${id}`);

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch product");
                }

                setProduct(data.data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                  } 
                // setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    console.log("product", product)


    return (
        <div className="grid m-3  gap-4">
            {/* Sidebar */}

            <div className="container mx-auto px-4 py-8">
                <Link href="/" className="text-primary hover:text-primary/80 mb-6 inline-block">
                    ← Back
                </Link>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <div className="relative aspect-square mb-4">
                            <img
                                src={product?.productImage }
                                alt={"pic"}
width={500}
height={"auto"}
                                className="rounded-lg object-cover"
                            />
                        </div>
                        {/* <div className="grid grid-cols-6 gap-1">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="relative aspect-square">
                                        <Image
                                            src={Pista}
                                            alt={`${products.name} thumbnail ${i}`}
                                            
                                            className="rounded-lg object-cover"
                                            width={100}
                                        />
                                    </div>
                                ))}
                            </div> */}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold mb-4">{product.seller.businessName}</h1>

                        <div className="space-y-4 mb-8">
                            <div>
                                <h2 className="font-semibold mb-2">Average Qty:</h2>
                                <p>{product?.averagePrice}</p>
                            </div>
                            <div>
                                <h2 className="font-semibold mb-2">Good Qty:</h2>
                                <p>{product?.goodPrice}</p>
                            </div>
                            <div>
                                <h2 className="font-semibold mb-2">High Qty:</h2>
                                <p>{product?.highPrice}</p>
                            </div>
                            <div>
                                <h2 className="font-semibold mb-2">MOQ:</h2>
                                <p>{product?.moq}</p>
                            </div>
                            <div>
                                <h2 className="font-semibold mb-2">Description:</h2>
                                <p className="text-gray-600">{product?.description}</p>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h2 className="font-semibold mb-4">Seller Details</h2>
                            <div className="flex items-center gap-4">
                                <img
                                    src={product?.seller.filePath}
                                    alt={seller.name}
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />
                                <div>
                                    <p className="font-medium">{product?.seller.businessName}</p>
                                    {seller.verified && (
                                        <span className="text-sm text-blue-500">✓ Verified</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* <div className="border-t mt-6 pt-6">
                            <h2 className="font-semibold mb-4">Sales Details</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Total No. of Order</p>
                                    <p className="font-medium">{'200'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Total Order Quantity</p>
                                    <p className="font-medium">{5087}</p>
                                </div>
                            </div>
                        </div> */}

                        {/* <div className="mt-6">
    <h3 className="font-semibold text-lg mb-4 text-gray-800">Last 10 day Prices</h3>
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
            {products[0].lastPrices?.length > 0 ? (
                products[0].lastPrices.map((price: any, index: any) => (
                    <li
                        key={index}
                        className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 transition"
                    >
                        <span className="text-gray-600 text-sm">Price {index + 1}</span>
                        <span className="font-medium text-gray-900">₹ {price}</span>
                    </li>
                ))
            ) : (
                <li className="px-4 py-3 text-center text-gray-500">
                    No price history available.
                </li>
            )}
        </ul>
    </div>
</div> */}

                    </div>
                </div>
            </div>
        </div>



    )
}

