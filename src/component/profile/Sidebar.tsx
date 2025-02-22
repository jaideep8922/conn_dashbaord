import Image from 'next/image'
import { QrCode } from 'lucide-react'

interface ProfileDetails {
  name: string
  type: string
  businessName: string
  email: string
  userId: string
  joinDate: string
  contact: string
  address: string
  gstNo: string
}

const profile: ProfileDetails = {
  name: 'Anjali Gupta',
  type: 'Supplier',
  businessName: 'Preferred not to say',
  email: 'muskansingh@gmail.com',
  userId: 'A225515',
  joinDate: '18 August 2024',
  contact: '(91) 291-6890',
  address: 'India',
  gstNo: 'India',
}

export function Sidebar() {
  return (
    <div className="w-72 rounded-lg bg-white p-6 shadow">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div className="h-16 w-16 overflow-hidden rounded-full">
            <Image
              src="/placeholder.svg"
              alt={profile.name}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <h2 className="text-xl font-semibold">{profile.name}</h2>
        <span className="mb-4 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
          {profile.type}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <h3 className="font-medium">DETAILS</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-600">Business Name:</p>
            <p>{profile.businessName}</p>
          </div>
          <div>
            <p className="text-gray-600">Email:</p>
            <p>{profile.email}</p>
          </div>
          <div>
            <p className="text-gray-600">User Id:</p>
            <p>{profile.userId}</p>
          </div>
          <div>
            <p className="text-gray-600">Join on:</p>
            <p>{profile.joinDate}</p>
          </div>
          <div>
            <p className="text-gray-600">Contact:</p>
            <p>{profile.contact}</p>
          </div>
          <div>
            <p className="text-gray-600">Address:</p>
            <p>{profile.address}</p>
          </div>
          <div>
            <p className="text-gray-600">GST NO:</p>
            <p>{profile.gstNo}</p>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <QrCode className="h-32 w-32" />
        </div>

        <div className="flex gap-2">
          <button className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Edit
          </button>
          <button className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Share
          </button>
        </div>
        <div className="rounded-md bg-red-100 p-2 text-center text-sm text-red-800">
          Suspended
        </div>
      </div>
    </div>
  )
}

