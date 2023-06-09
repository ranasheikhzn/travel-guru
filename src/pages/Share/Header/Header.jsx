import React, { useContext } from 'react';
import logo1 from '../../../assets/logos/logo1.png'
import logo2 from '../../../assets/logos/logo2.png'
import { Link, useLocation } from 'react-router-dom';
import { FaSearchLocation } from "react-icons/fa";
import './Header.css'
import { AuthContext } from '../../../providers/AuthProvider';
import { toast } from 'react-toastify';

const Header = () => {
    const location = useLocation()
    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(() => toast.success("Logout Successful", { position: toast.POSITION.TOP_CENTER }))
            .catch(err => toast.error(err.message, { position: toast.POSITION.TOP_CENTER }))
    }

    return (
        <nav>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-8 px-12">
                <Link to='/' className="flex items-center">
                    {
                        location.pathname.startsWith("/user") ? <img src={logo2} className="h-12" alt="Travel Guru Logo" />
                            : <img src={logo1} className="h-12" alt="Travel Guru Logo" />
                    }
                </Link>
                {
                    !location.pathname.startsWith("/user") && <form>
                        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FaSearchLocation className='text-white' />
                            </div>
                            <input type="search" id="search" className="block w-[260px] p-2.5 pl-10 text-sm text-white bg-[#80808069] border border-gray-300 rounded-lg" placeholder="Search Your Destinations..." required />
                        </div>
                    </form>
                }
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="#fff" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0">
                        <li>
                            <Link to='/' className="block py-2 mr-4 text-[#F9A51A] md:p-0 ">Home</Link>
                        </li>
                        <li>
                            <Link className={`block py-2 mr-4 md:p-0 ${location.pathname.startsWith("/user") ? 'text-gray-900' : 'text-white'}`}>Destination</Link>
                        </li>
                        <li>
                            <Link className={`block py-2 mr-4 md:p-0 ${location.pathname.startsWith("/user") ? 'text-gray-900' : 'text-white'}`}>Blog</Link>
                        </li>
                        <li>
                            <Link className={`block py-2 mr-4 md:p-0 ${location.pathname.startsWith("/user") ? 'text-gray-900' : 'text-white'}`}>Contact</Link>
                        </li>
                        {
                            user ? <li className={`text-lg font-bold ${location.pathname.startsWith("/user") ? 'text-gray-900' : 'text-white'}`}>
                                {user.displayName}
                            </li> : ""
                        }
                        <li>
                            {
                                user ? <button onClick={handleLogOut} className='btn-main'>Logout</button>
                                    : <Link to='/user/login'>
                                        <button className='btn-main'>Login</button>
                                    </Link>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
};

export default Header;