import React, { useEffect, useState, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5"
import { IoMdArrowDropdown } from "react-icons/io"
import { FaUser, FaSignOutAlt, FaCog, FaHistory, FaFilm } from "react-icons/fa"
import userIcon from '../assets/user.png'
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
                        {/* Logo with Icon + Text, no Home link before it */}
                        <Link to={"/"} className='flex items-center mr-6 group'>
                            <FaFilm className="text-red-500 text-2xl mr-2 group-hover:text-red-400 transition-colors" />
                            <span className="font-bold text-xl text-white tracking-tight">Lukoba</span>
                        </Link>
                        
                        {/* Main navigation */}
                        <nav className='hidden lg:flex items-center space-x-1'>
                            {navigation
                                .filter(nav => nav.label !== "Home")
                                .map((nav, index) => (
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
                                ))
                            }
                        </nav>
                    </div>

                    {/* Right Section: Search & Profile */}
                    <div className='flex items-center space-x-6'>
                        {/* Search Form */}
                        <div className='relative'>
                            <form 
                                className={`flex items-center ${isSearchOpen ? 'bg-gray-900' : 'bg-gray-800'} rounded-full overflow-hidden pr-2 transition-colors`} 
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type='text'
                                    placeholder='Search movies, shows...'
                                    className='bg-transparent pl-4 pr-2 py-2 outline-none border-none w-48 text-sm text-gray-200'
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    value={searchInput}
                                    onFocus={() => setIsSearchOpen(true)}
                                    onBlur={() => setIsSearchOpen(false)}
                                />
                                <button 
                                  type="submit"
                                  className='text-xl text-gray-400 hover:text-white transition-colors'
                                  aria-label="Search"
                                >
                                    <IoSearchOutline />
                                </button>
                            </form>
                        </div>

                        {/* Profile Dropdown */}
                        <div className='relative' ref={profileDropdownRef}>
                            <button 
                                type="button"
                                className='flex items-center space-x-2 focus:outline-none'
                                onClick={handleProfileClick}
                                aria-expanded={isProfileDropdownOpen ? "true" : "false"}
                                aria-label="User menu"
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
                                    <button 
                                        type="button"
                                        className='w-full text-left flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white'
                                    >
                                        <FaSignOutAlt className='mr-3 text-gray-400' />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Secondary Navigation for genres or featured categories */}
            <div className='hidden lg:block bg-black bg-opacity-50 border-t border-gray-800'>
                <div className='container mx-auto px-4'>
                    <div className='flex items-center h-10 text-xs'>
                        <Link to="/genre/action" className='text-gray-400 hover:text-white px-3 transition-colors'>Action</Link>
                        <Link to="/genre/comedy" className='text-gray-400 hover:text-white px-3 transition-colors'>Comedy</Link>
                        <Link to="/genre/drama" className='text-gray-400 hover:text-white px-3 transition-colors'>Drama</Link>
                        <Link to="/genre/horror" className='text-gray-400 hover:text-white px-3 transition-colors'>Horror</Link>
                        <Link to="/genre/sci-fi" className='text-gray-400 hover:text-white px-3 transition-colors'>Sci-Fi</Link>
                        <Link to="/genre/documentary" className='text-gray-400 hover:text-white px-3 transition-colors'>Documentary</Link>
                        <Link to="/new" className='text-red-500 hover:text-red-400 px-3 ml-auto font-medium transition-colors'>New Releases</Link>
                        <Link to="/trending" className='text-gray-300 hover:text-white px-3 font-medium transition-colors'>Trending</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header