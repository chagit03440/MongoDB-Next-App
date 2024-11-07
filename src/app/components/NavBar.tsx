"use client"
import React from 'react'
// import ButtonLink from './Button'
import { useRouter } from 'next/navigation'

const NavBar = () => {
    const router = useRouter();
    const routes=[
        {text:"Home",dashboard:"home"},
        {text:"SignIn",dashboard:"signIn"},
        {text:"SignUp",dashboard:"signUp"},
        {text:"Users",dashboard:"users"},
    ]
    return (
        <div className="fixed top-0 left-0 w-full flex items-center justify-between bg-purple-700 p-4 shadow-md text-white">
        <h1 className="text-2xl font-bold text-purple-200">My Web</h1>
        <div className="flex space-x-4">
            {routes.map((route, index) =>(
            <button  className='text-purple-200 rounded' key={index} type="button" onClick={() => router.push(`/pages/${route.dashboard}`)}>{route.text}</button>))}
        </div>
        </div>
    )
}

export default NavBar
