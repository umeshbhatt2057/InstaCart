import React, { useContext, useState, useEffect, useRef } from 'react';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart, FaTools } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuDisplay(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = () => {
    if (search) {
      navigate(`/search?q=${search}`);
    } else {
      navigate("/search");
    }
  };

  const handleScrollToTop = () => {
    setSearch("");  // Clear search input when navigating to homepage
    navigate("/");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        
        <div className='flex items-center'>
          {/* InstaCart button with scroll to top */}
          <div 
            className='text-4xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 cursor-pointer' 
            onClick={handleScrollToTop}
          >
            InstaCart
          </div>
        </div>

        <div className='hidden lg:flex items-center cursor-pointer w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input 
            type='text' 
            placeholder='Search product here...' 
            className='w-full outline-none' 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}  // Update search value only
          />
          <div 
            className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'
            onClick={handleSearch}  // Trigger search on button click
          >
            <GrSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>
          <div className='relative flex justify-center' ref={menuRef}>
            {user?._id && (
              <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
                {user?.profilePic ? (
                  <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className='absolute bg-white shadow-md rounded-lg border border-gray-300 right-0 top-12 w-48 p-2'>
                <nav>
                  {(user?.role === ROLE.ADMIN || user?.role === ROLE.SUPERADMIN) && (
                    <Link 
                      to={"/admin-panel/all-products"} 
                      className='flex items-center hover:bg-blue-50 p-2 rounded-md transition duration-300 ease-in-out text-blue-600 hover:text-blue-800'
                    >
                      <span className='mr-2 text-lg'>
                        <FaTools />
                      </span>
                      <span className='text-sm font-medium'>Admin Panel</span>
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className='text-2xl relative'>
              <span><FaShoppingCart /></span>
              <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-sm'>{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
            ) : (
              <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
