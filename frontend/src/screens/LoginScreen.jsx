import { Link , useNavigate} from "react-router-dom"
import { useState , useEffect} from "react"
import { useDispatch , useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import { useLoginMutation } from '../slices/userApiSlice'
import { setCredentials } from "../slices/authSlice"
import { toast } from 'react-toastify'

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
      if(userInfo) {
         navigate('/')
      }
    },[navigate, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const res = await login({ email, password }).unwrap();
          dispatch(setCredentials({...res}));
          navigate('/')
        } catch (error) {
          toast.error(error?.data?.message || error.error)
        }
    }

  return (
    <FormContainer>
    <div className="flex flex-col space-y-4 p-4 w-96 h-auto border rounded-md shadow-2xl ">
    <h1 className="text-center text-lg font-bold">Sign In</h1>
    <form onSubmit={submitHandler}>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          className="p-2 border rounded-md"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        required/>
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="password" className="text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          className="p-2 border rounded-md"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        required/>
      </div>
      <div className="flex justify-center mt-4">
        <button
        disabled={isLoading}
          type="submit"
          className="px-4 py-2 bg-red-700 text-white rounded-lg shadow hover:bg-red-800 transition"
        >
          Sign In
        </button>
        </div>
        <div className="flex justify-center">
            <h3>New Customer ? <Link to="/register" className="text-blue-700">Register</Link> </h3>
        </div>

    </form>
  </div>
  </FormContainer>
  )
}

export default LoginScreen
