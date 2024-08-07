import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CreatePin, Feed, Search, Navbar, PinDetail } from '..'

export default function Pins({user}) {
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <div className='px-2 md:px-5'>
            <div className='bg-gray-50'>
                <Navbar user={user} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </div>
            <div className='h-full'>
                <Routes>
                    <Route path="/" element={<Feed />}/>
                    <Route path="/category/:categoryId" element={<Feed />}/>
                    <Route path="/pin/:pinId" element={<PinDetail user={user}/>}/>
                    <Route path="/createPin" element={<CreatePin user={user}/>}/>
                    <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}/>
                </Routes>
            </div>
        </div>
    )
}
