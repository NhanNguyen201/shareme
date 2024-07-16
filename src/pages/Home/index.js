import { useState, useEffect, useRef } from 'react'

import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { client } from '../../sanityClient'
import { SideBar, Pins, UserProfile } from '../../Components'

import { userQuery } from '../../utils/sanityData'
import logo from '../../assets/logo.png'

import { fetchUser } from '../../utils/fetchUser'

export default function Home() {
    const scrollRef = useRef(null)
    const location = useLocation()
    const [toggleSideBar, setToggleSideBar] = useState(false)
    const [user, setUser] = useState({})
  
   
    useEffect(() => {
        if(location.state !== null &&'user' in location.state && Object.keys(location.state.user).length === 0) {
            setUser({})
        } 
        async function getUser() {
            const userInfo = fetchUser()
            if(userInfo) {
                const query = userQuery(userInfo?._id)
                const data =  await client.fetch(query)
                setUser(data[0])
            } else {
                setUser({})
            }
        }
        getUser()

    }, [location])

    useEffect(() => {
        scrollRef.current.scrollTo(0,0)
    }, [])
    return (
        <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
            <div className='hidden md:flex h-screen flex-initial'>
                <SideBar user={user && user}/>
            </div>
            <div className='flex md:hidden flex-row'>
                <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
                    <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSideBar(true)}/>
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-28"/>
                    </Link>
                    <Link to={`/user/${user?._id}`}>
                        <img src={user?.image} alt="logo" className="w-28"/>
                    </Link>
                </div>
                {toggleSideBar && (
                    <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                        <div className='absolute w-full flex justify-end items-center p-2'>
                            <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSideBar(false)}/>
                        </div>
                        <SideBar user={user && user} closeToggle={setToggleSideBar}/>
                    </div>
                )}
            </div>
            <div className='pb-2 flex-1 h-screen overflow-y-auto' ref={scrollRef}>
                <Routes>
                    <Route path="/user/:userId" element={<UserProfile />}/>
                    <Route path="/*" element={<Pins user={user && user}/>}/>
                </Routes>
            </div>
        </div>
    )
}
