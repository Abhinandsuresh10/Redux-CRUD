import { useDispatch } from "react-redux";
import { useLoginAdminMutation } from "../slices/adminApiSlice.js";
import { setCredentials } from "../slices/adminAuthSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { useState } from "react";
 


const AdminLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adminLogin, {isLoading}] = useLoginAdminMutation();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await adminLogin({email, password}).unwrap();
      dispatch(setCredentials({...res}))
      navigate('/dashboard')  
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }

    }

    return (
      <div className="h-[600px] flex items-center justify-center bg-gray-400">
        <div className="bg-gray-400 p-8 rounded-lg border w-full max-w-sm shadow-2xl">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Admin Login</h2>
          
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">Email</label>
              <input 
                type="email"
                value={email}
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-600">Password</label>
              <input 
                type="password" 
                value={password}
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            
            <button 
            onClick={handleSubmit}
              type="submit" 
              className="w-[30%] ml-28 bg-red-700 text-white p-2 rounded-lg "
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default AdminLogin;
  
