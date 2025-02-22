import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, FileText } from 'lucide-react'
import Profile from '../../assets/profile_user.jpg'

export default function NotificationDetail() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b">
        <Link 
          href="#" 
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Link>
        <h1 className="text-lg font-medium">Notifications</h1>
        <div className="w-16" /> {/* Spacer for centering */}
      </header>

      {/* Message Content */}
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Message Header */}
          <div className="flex items-start gap-4 mb-6">
            <Image
              src={Profile}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-medium">Dalila Ouldcott</h2>
                  <p className="text-sm text-gray-500">ouldcott@yellowpages.com</p>
                </div>
                <span className="text-sm text-gray-500">Dec 25, 2024</span>
              </div>
            </div>
          </div>

          {/* Message Body */}
          <div className="space-y-4 text-gray-600">
            <p>Hey John,</p>
            <p>
              wellish laminable inount popshop catalyte prismatize campimetrical lentisk excluding portlet coccinellid impestiation 
              Bangash collardist parametroid proceleusmaticum presume capimetreto wishbloom nailnook Odontocete Alea holocdont 
              welled
            </p>
            <p>
              cibarious terrifical uploop naphthaleneacetic containable nonsailor Zwinglian blightly benchful guar porch fallectomy 
              building coinvolve eibolism warmth underclealize seismographic recongeal ethanethial clog regicidal regalment legific
            </p>
          </div>

          {/* Attachments */}
          <div className="mt-8">
            <div className="text-sm text-gray-500 mb-3">1 Attachment</div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg w-fit">
              <FileText className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm font-medium">example.doc</p>
                <p className="text-xs text-gray-500">(11MB)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

