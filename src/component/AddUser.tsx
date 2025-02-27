'use client'

import { useFormik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import toast,{Toaster} from 'react-hot-toast'

interface FormValues {
  userType: 'retailer' | 'seller'
  businessName: string
  businessOwner: string
  phone: string
  gstNumber: string
  shopMarka: string
  transport: string
  pincode: string
  state: string
  city: string
  address: string
  adminId: number,
  // customId:string,
  // qrCode:string
  // photo: string
}

export default function AddUser() {
  const [photoPreview, setPhotoPreview] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)


  const formik = useFormik<FormValues>({
    initialValues: {
      userType: 'seller',
      businessName: '',
      businessOwner: '',
      phone: '',
      gstNumber: '',
      shopMarka: '',
      transport: '',
      pincode: '',
      state: '',
      city: '',
      address: '',
      adminId: 1,
      // customId:'',
      // qrCode:''
      // photo: '',
    },
    onSubmit: async (values) => {
      setLoading(true)
      setMessage(null)
      try {
        console.log("values", values)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/onboard-user-by-admin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })

        const data = await response.json()
        console.log("datadatadata", data)

        if (response.ok) {
          setMessage('User added successfully!')
          toast.success('User added successfully!')
          formik.resetForm()
          setPhotoPreview('')
        } else {
          throw new Error(data.message || 'Something went wrong')
        }
      } catch (error) {
        if (error instanceof Error) {
          setMessage(error.message);
          toast.error('Errror Occured!')

        } else {
          setMessage('An unknown error occurred');
          toast.error('Errror Occured!')
        }
      } finally {
        setLoading(false)
      }
    },
  })

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
        formik.setFieldValue('file', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen p-4 m-3">
      <Toaster />
      <div className="mx-auto">
        <div className="mb-6 flex items-center">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault()
              history.back()
            }}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back
          </Link>
          <h1 className="ml-auto text-xl font-semibold">Add User</h1>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-medium">Add New User</h2>

          {message && <p className="mb-4 text-center text-sm text-green-500">{message}</p>}

          <form onSubmit={formik.handleSubmit} className="space-y-6">


            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="retailer"
                  checked={formik.values.userType === 'retailer'}
                  onChange={formik.handleChange}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Retailer</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="seller"
                  checked={formik.values.userType === 'seller'}
                  onChange={formik.handleChange}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Supplier</span>
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  onChange={formik.handleChange}
                  value={formik.values.businessName}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Owner Name
                </label>
                <input
                  type="text"
                  name="businessOwner"
                  onChange={formik.handleChange}
                  value={formik.values.businessOwner}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  GST Number
                </label>
                <input
                  type="text"
                  name="gstNumber"
                  onChange={formik.handleChange}
                  value={formik.values.gstNumber}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shop Marks
                </label>
                <input
                  type="text"
                  name="shopMarka"
                  onChange={formik.handleChange}
                  value={formik.values.shopMarka}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Transport
                </label>
                <input
                  type="text"
                  name="transport"
                  onChange={formik.handleChange}
                  value={formik.values.transport}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pin Code
                </label>
                <input
                  type="text"
                  name="pincode"
                  onChange={formik.handleChange}
                  value={formik.values.pincode}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  onChange={formik.handleChange}
                  value={formik.values.state}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Photo
              </label>
              <div className="mt-2 flex items-center space-x-6">
                <div className="h-24 w-24 overflow-hidden rounded-full">
                  {photoPreview ? (
                    <Image
                      src={photoPreview}
                      alt="Profile preview"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                      <span className="text-gray-400">No photo</span>
                    </div>
                  )}
                </div>
                <label className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <span>Upload photo</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                href="#"
                className="rounded-md px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
              >
                Back
              </Link>
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}