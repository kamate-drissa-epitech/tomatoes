"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Header() {
  const [userId, setUserId] = useState(null)
  const router = useRouter()

  useEffect(() => {
    setUserId(localStorage.getItem('userId'))
  }, [])

  const handleLogout = ()=>{
    localStorage.removeItem("userId")
    setUserId(null)
    router.push('/')
  }
  
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-10">
        <div className="flex flex-wrap justify-between items-center mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="blue"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-film"
            >
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="2.18"
                ry="2.18"
              ></rect>
              <line x1="7" y1="2" x2="7" y2="22"></line>
              <line x1="17" y1="2" x2="17" y2="22"></line>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <line x1="2" y1="7" x2="7" y2="7"></line>
              <line x1="2" y1="17" x2="7" y2="17"></line>
              <line x1="17" y1="17" x2="22" y2="17"></line>
              <line x1="17" y1="7" x2="22" y2="7"></line>
            </svg>
            <span className="self-center text-blue-600   text-2xl font-semibold whitespace-nowrap dark:text-white">
              GreatMovies
            </span>
          </a>
          {/* if user login or not */}
          {
            !userId ? <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a
              href="/auth/login"
              className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
            >
              Login
            </a>
            <a
              href="/auth/register"
              className="text-sm  text-gray-500 dark:text-white hover:underline hover:text-blue-600"
            >
              Register
            </a>
          </div> : 
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <a
            href={`/user/${userId}`}
            className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
          >
            Profile
          </a>
          <p
          
            className="text-sm cursor-pointer  text-gray-500 dark:text-white hover:underline hover:text-blue-600"
            onClick={handleLogout}
          >
            Logout
          </p>
        </div> 
          }
        </div>
      </nav>
  )
}
