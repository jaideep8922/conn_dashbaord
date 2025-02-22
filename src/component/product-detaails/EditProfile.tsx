'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Profile from '../../assets/profile_user.jpg'

interface FormData {
  userType: 'retailer' | 'supplier'
  businessName: string
  ownerName: string
  phoneNumber: string
  gstNumber: string
  shopMarks: string
  preferredTransport: string
  pinCode: string
  state: string
  city: string
  address: string
  profilePicture?: File
}

export default function EditUserForm() {
  const [formData, setFormData] = useState<FormData>({
    userType: 'supplier',
    businessName: 'P Kumar',
    ownerName: 'BH+JH_JVM_ SHYAMLI',
    phoneNumber: 'BH+JH_JVM_ SHYAMLI',
    gstNumber: 'Ashwani Kumar',
    shopMarks: 'BH+JH_JVM_ SHYAMLI',
    preferredTransport: 'BH+JH_JVM_ SHYAMLI',
    pinCode: 'Ashwani Kumar',
    state: 'Ashwani Kumar',
    city: 'BH+JH_JVM_ SHYAMLI',
    address: 'BH+JH_JVM_ SHYAMLI'
  })

  const [previewUrl, setPreviewUrl] = useState<string>('/placeholder.svg?height=100&width=100')

  console.log("previewUrl", previewUrl)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, profilePicture: file }))
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="#" className="text-blue-600 hover:text-blue-800">
            ← Back
          </Link>
          <h1 className="text-xl font-semibold">Edit User Details</h1>
          <div className="w-[60px]"></div> {/* Spacer for alignment */}
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow-sm">
          {/* User Type Selection */}
          <div className="mb-6 flex gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="retailer"
                checked={formData.userType === 'retailer'}
                onChange={handleInputChange}
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <span>Retailer</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="supplier"
                checked={formData.userType === 'supplier'}
                onChange={handleInputChange}
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <span>Supplier</span>
            </label>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="mb-1 block text-sm text-gray-600">Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">Owner Name</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">GST Number</label>
                <input
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">Shop Marks</label>
                <input
                  type="text"
                  name="shopMarks"
                  value={formData.shopMarks}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">Preferred Transport</label>
                <input
                  type="text"
                  name="preferredTransport"
                  value={formData.preferredTransport}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="mb-1 block text-sm text-gray-600">Pin Code</label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">Profile Picture</label>
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full">
                    <Image
                      src={Profile}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="profile-upload"
                    />
                    <label
                      htmlFor="profile-upload"
                      className="cursor-pointer text-sm text-blue-600 hover:text-blue-800"
                    >
                      Click to upload
                    </label>
                    <p className="text-xs text-gray-500">or drag and drop</p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              className="rounded-md border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

