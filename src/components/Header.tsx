import React, { useEffect, useState, useRef } from 'react'
import logo from '../assets/favicon/android-chrome-512x512.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import userIcon from '../assets/user.png'
import { IoSearchOutline } from "react-icons/io5"
import { IoMdArrowDropdown } from "react-icons/io"
import { FaUser, FaSignOutAlt, FaCog, FaHistory } from "react-icons/fa"
import { navigation } from '../constants/navigation'

const Header: React.FC = () => {
    const location = useLocation()
    const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
    const [searchInput, setSearchInput] = useState(removeSpace || "")
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
    const navigate = useNavigate()
    const profileDropdownRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        if(searchInput) {
            navigate(`/search?q=${searchInput}`)
        }
    }, [searchInput, navigate])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
    }

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
                setIsProfileDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleProfileClick = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen)
    }

    return (
        <header className='fixed top-0 w-full z-50 bg-gradient-to-b from-black to-transparent'>
            <div className='container mx-auto px-4'>
                {/* Main Navigation Bar */}
                <div className='flex items-center justify-between h-16'>
                    {/* Left Section: Logo & Nav */}
                    <div className='flex items-center'>
                        <Link to={"/"} className='flex items-center mr-6'>
                            <img
                                src={logo}
                                alt='Lukoba'
                                width={120}
                                className='object-contain max-h-15'
                            />
                        </Link>
                        
                        {/* Main navigation */}
                        <nav className='hidden lg:flex items-center space-x-1'>
                            {navigation.map((nav, index) => (
                                <NavLink 
                                    key={`${nav.label}-header-${index}`} 
                                    to={nav.href} 
                                    className={({isActive}) => 
                                        `px-4 py-2 text-sm font-medium hover:bg-gray-800 rounded-md transition-colors
                                        ${isActive ? "text-red-500" : "text-gray-300 hover:text-white"}`
                                    }
                                >
                                    {nav.label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    {/* Right Section: Search & Profile */}
                    <div className='flex items-center space-x-6'>
                        {/* Search Form */}
                        <div className='relative'>
                            <form 
                                className={`flex items-center ${isSearchOpen ? 'bg-gray-900' : 'bg-gray-800'} rounded-full overflow-hidden pr-2`} 
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type='text'
                                    placeholder='Search movies, shows...'
                                    className='bg-transparent pl-4 pr-2 py-2 outline-none border-none w-48 text-sm'
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    value={searchInput}
                                    onFocus={() => setIsSearchOpen(true)}
                                    onBlur={() => setIsSearchOpen(false)}
                                />
                                <button className='text-xl text-gray-400 hover:text-white transition-colors'>
                                    <IoSearchOutline />
                                </button>
                            </form>
                            
                            {/* Search suggestions could go here */}
                        </div>

                        {/* Profile Dropdown */}
                        <div className='relative' ref={profileDropdownRef}>
                            <button 
                                className='flex items-center space-x-2 focus:outline-none'
                                onClick={handleProfileClick}
                            >
                                <div className='w-8 h-8 rounded-full overflow-hidden border-2 border-gray-700 hover:border-red-500 transition-all'>
                                    <img
                                        src={userIcon}
                                        alt="User"
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <IoMdArrowDropdown className={`text-gray-400 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {isProfileDropdownOpen && (
                                <div className='absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-50 border border-gray-800'>
                                    <div className='px-4 py-3 border-b border-gray-800'>
                                        <p className='text-sm font-medium text-white'>User Name</p>
                                        <p className='text-xs text-gray-400'>user@example.com</p>
                                    </div>
                                    <Link to="/profile" className='flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white'>
                                        <FaUser className='mr-3 text-gray-400' />
                                        Profile
                                    </Link>
                                    <Link to="/history" className='flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white'>
                                        <FaHistory className='mr-3 text-gray-400' />
                                        Watch History
                                    </Link>
                                    <Link to="/settings" className='flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white'>
                                        <FaCog className='mr-3 text-gray-400' />
                                        Settings
                                    </Link>
                                    <div className='border-t border-gray-800 mt-1'></div>
                                    <button className='w-full text-left flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white'>
                                        <FaSignOutAlt className='mr-3 text-gray-400' />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Optional: Secondary Navigation for genres or featured categories */}
            <div className='hidden lg:block bg-black bg-opacity-50 border-t border-gray-800'>
                <div className='container mx-auto px-4'>
                    <div className='flex items-center h-10 text-xs'>
                        <Link to="/genre/action" className='text-gray-400 hover:text-white px-3'>Action</Link>
                        <Link to="/genre/comedy" className='text-gray-400 hover:text-white px-3'>Comedy</Link>
                        <Link to="/genre/drama" className='text-gray-400 hover:text-white px-3'>Drama</Link>
                        <Link to="/genre/horror" className='text-gray-400 hover:text-white px-3'>Horror</Link>
                        <Link to="/genre/sci-fi" className='text-gray-400 hover:text-white px-3'>Sci-Fi</Link>
                        <Link to="/genre/documentary" className='text-gray-400 hover:text-white px-3'>Documentary</Link>
                        <Link to="/new" className='text-red-500 hover:text-red-400 px-3 ml-auto font-medium'>New Releases</Link>
                        <Link to="/trending" className='text-gray-300 hover:text-white px-3 font-medium'>Trending</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header

// Note: Minute:1.20:42