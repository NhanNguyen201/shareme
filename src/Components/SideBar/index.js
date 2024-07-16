import { NavLink, Link } from "react-router-dom"
import { RiHomeFill } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'
import { categories } from '../../utils/sanityData'
import logo from '../../assets/logo.png'
const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-20 ease-in-out capitalize'
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-20 ease-in-out capitalize'

export default function SideBar({user, closeToggle}) {
    const handleClose = () => {
        if(closeToggle) closeToggle(false)
    }
    return (
        <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
            <div className="flex flex-col">
                <Link 
                    to="/" 
                    className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
                    onClick={handleClose}
                >
                    <img src={logo} alt="logo" className="w-full"/>
                </Link>
                <div className="flex flex-col gap-5">
                    <NavLink
                        to="/"
                        className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
                        onClick={handleClose}
                    >
                        <RiHomeFill/>
                        Home
                    </NavLink>
                    <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover categories</h3>
                    {categories.slice(0, categories.length -1).map(category => (
                        <NavLink
                            to={`/category/${category.name}`}
                            className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
                            onClick={handleClose}
                            key={category.name}
                        >
                            <IoIosArrowForward />
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            {user && (
                <Link
                    to={`user/${user._id}`}
                    className="flex items-center my-5 mx-3 mb-3 gap-2 p-2 bg-white rounded-lg shadow-lg"
                    onClick={handleClose}

                >
                    <img src={user.image} className="w-10 h-10 rounded-full" alt="user profill"/>
                    <p>{user.name}</p>
                </Link>
            )}
        </div>
    )
}
