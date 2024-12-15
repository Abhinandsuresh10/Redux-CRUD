import { FaSignInAlt, FaUserCircle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';
import { Adlogout } from '../slices/adminAuthSlice';
import { useLogoutAdminMutation } from '../slices/adminApiSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Check specific routes
  const isAdminRoute = location.pathname === '/admin';
  const isDashboardRoute = location.pathname === '/dashboard';
  const isEditUserRoute = location.pathname.startsWith('/edit-user');
  const isAddUserRoute = location.pathname.startsWith('/add-user');

  const [logoutApiCall] = useLogoutMutation();
  const [logoutAdminApiCall] = useLogoutAdminMutation();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    if (dropdownOpen) {
      const timer = setTimeout(() => {
        setDropdownOpen(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [dropdownOpen]);

  const logoutHandler = async () => {
    const checking = confirm('are you sure you want to logout ?')
    if(checking) {
      try {
        setDropdownOpen(false);
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    }  else {
      return
    }
  };

  const handleAdminLogout = async () => {
    const checking = confirm('are you sure you want to logout ?')
    if(checking) {
    try {
      setDropdownOpen(false);
      await logoutAdminApiCall().unwrap();
      dispatch(Adlogout());
      navigate('/admin')
    } catch (error) {
      console.log(error)
    }
  }
  }

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold md:text-xl text-sm">USER MANAGEMENT</h1>

        {!isAdminRoute && !isAddUserRoute && !isEditUserRoute && (
          <nav>
            {isDashboardRoute ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 hover:text-gray-300"
                >
                  <FaUserCircle size={24} />
                  <span>Admin</span>
                </button>
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md">
                    <li className="border-b">
                      <Link
                        to="/add-user"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Add User
                      </Link>
                    </li>
                    <li>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={handleAdminLogout}
                      >
                        Admin Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : userInfo ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 hover:text-gray-300"
                >
                  <FaUserCircle size={24} />
                  <span>{userInfo.name}</span>
                </button>
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md">
                    <li className="border-b">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logoutHandler}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <ul className="flex space-x-4">
                <li>
                  <Link to="/login" className="hover:text-gray-300 flex items-center">
                    <FaSignInAlt />
                    <span className="ml-2">User SignIn</span>
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
