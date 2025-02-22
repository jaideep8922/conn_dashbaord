'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import File from '../assets/profile_user.jpg'

export default function Header() {
  const [currentDate, setCurrentDate] = useState<string | null>(null)
  const[name, setName]= useState()

  // useEffect(() => {
  //   const data = localStorage?.getItem("user");
  //   if (data) {
  //     const parsedData = JSON.parse(data);
  //     setName(parsedData.name);
  //   }
  // }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("user");
      if (data) {
        const parsedData = JSON.parse(data);
        setName(parsedData.name);
      }
    }
  }, []);


  useEffect(() => {
    const date = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
    const formattedDate = date.toLocaleDateString('en-US', options)
    const [weekday, rest] = formattedDate.split(', ')
    const [month, day, year] = rest.split(' ')
    console.log("yesr", year)
    setCurrentDate(`${weekday}- ${day} ${month}, ${2024}`)
  }, [])

 


  return (
    <header className="flex items-center justify-between px-6 py-6 bg-white border-b">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-600 text-white p-2 rounded">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <span className="text-sm font-medium">
          {currentDate || "Loading..."}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* <button className="p-2 hover:bg-gray-100 rounded-full">
          <Search className="w-5 h-5 text-gray-500" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell className="w-5 h-5 text-gray-500" />
        </button> */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm font-medium">{name}</div>
            {/* <div className="text-xs text-gray-500">admin</div> */}
          </div>
          <div className="relative w-8 h-8">
            <Image
              src={File}
              alt="Profile"
              className="rounded-full"
              width={32}
              height={32}
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  )
}
