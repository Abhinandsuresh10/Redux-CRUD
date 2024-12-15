import { useNavigate} from "react-router-dom"
import { useState } from "react"
import FormContainer from "../components/FormContainer"
import { toast } from 'react-toastify'
import { useAddUserMutation } from "../slices/adminApiSlice"

const AddUserScreen = () => {
  
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
      }
    };

    const navigate = useNavigate();

    const [register, { isLoading }] = useAddUserMutation();

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
          formData.append("name", name);
          formData.append("email", email);
          formData.append("password", password);
          if (image) {
            formData.append("image", image);
          }
          try {
          await register(formData).unwrap();
          navigate('/dashboard')
          } catch (error) {
            toast.error(error?.data?.message || error.error)
          }
        }
    }

  return (
    <FormContainer>
    <div className="flex flex-col space-y-4 p-4 w-96 h-auto border rounded-md shadow-2xl">
    <h1 className="text-center text-lg font-bold">Add User</h1>
    <form onSubmit={submitHandler}>
    <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-medium mb-1">Name</label>
        <input
          type="name"
          value={name}
          className="p-2 border rounded-md"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          className="p-2 border rounded-md"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
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
          placeholder="Enter password"
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
          Add
        </button>
        </div>

    </form>
  </div>
  </FormContainer>
  )
}

export default AddUserScreen
