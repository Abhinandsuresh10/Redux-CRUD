import { useState , useEffect} from "react"
import FormContainer from "../components/FormContainer"
import { useDispatch , useSelector } from "react-redux"
import { toast } from 'react-toastify'
import { useUpdateUserMutation } from "../slices/userApiSlice"
import { setCredentials } from "../slices/authSlice"
import { useNavigate } from "react-router-dom"


const ProfileScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setImage(userInfo.image);
    },[userInfo.name,userInfo.email,userInfo.image])

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
      }
    };

    
    const submitHandler = async (e) => {
        e.preventDefault();
        const RegPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if(!RegPassword.test(password)) {
          toast.error('Password must be 6+ characters with letters and numbers')
          return;
        }
        if(password !== confirmPassword) {
          toast.error('password do not match')
        } else {
          const formData = new FormData();
          formData.append("_id", userInfo._id);
          formData.append("name", name);
          formData.append("email", email);
          formData.append("password", password);
          if (image instanceof File) {
            formData.append('image', image); 
          } else if (image) {
            formData.append('image', image); 
          }
         try {
          const res = await updateProfile(formData).unwrap();
          dispatch(setCredentials({...res}));
          navigate('/')
          toast.success('Profile updated')
         } catch (error) {
          toast.error(error?.data?.message || error.error)
         }
        }
    }

  return (
    <FormContainer>
    <div className="flex flex-col space-y-4 p-4 w-96 h-auto border rounded-md shadow-2xl">
    <h1 className="text-center text-lg font-bold">Update profile</h1>
    <form onSubmit={submitHandler}>
    <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-medium mb-1">Name</label>
        <input
          type="name"
          value={name}
          className="p-2 border rounded-md"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          className="p-2 border rounded-md"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col pt-3">
        <label htmlFor="file" className="text-sm font-medium mb-1">ProfileImage</label>
        <input
          type="file"
          className="p-2 border rounded-md"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="password" className="text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          className="p-2 border rounded-md"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="password" className="text-sm font-medium mb-1">confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          className="p-2 border rounded-md"
          placeholder="confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-center mt-4">
        <button
          disabled={isLoading}
          type="submit"
          className="px-4 py-2 bg-red-700 text-white rounded-lg shadow hover:bg-red-800 transition"
        >
          Update
        </button>
        </div>
    </form>
  </div>
  </FormContainer>
  )
}

export default ProfileScreen
