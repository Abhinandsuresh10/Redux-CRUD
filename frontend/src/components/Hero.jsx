
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';

const Hero = () => {

  const { userInfo } = useSelector((state) => state.auth);
  const imagePath = userInfo ? Cookies.get('userInfo') && JSON.parse(Cookies.get('userInfo')).image : null;

  return (
<div className="py-28 bg-gradient-to-b from-gray-50 ">
  <div className="container mx-auto flex justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start w-3/4 md:w-2/3 lg:w-1/2">
      <div className="w-32 h-32 bg-gray-200 rounded-full shadow-md flex-shrink-0 mb-6 md:mb-0 md:mr-6">
        <img
          src={imagePath ? `http://localhost:5000${imagePath}` : 'user image'}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 tracking-wide">
          User Details
        </h1>
        <div className="w-20 h-1 bg-blue-500 rounded-full mb-6"></div>
        <p className="text-lg mb-4 text-gray-600">
           {userInfo ? <span className="font-medium text-indigo-700">name - {userInfo.name}</span> : 'There is a huge collection is coming register or login to explore the upcoming products 😊'}
          </p>
       <p className="text-lg mb-4 text-gray-600">
           {userInfo ? <span className="font-medium text-indigo-700">email - {userInfo.email}</span> : 'Login to see your details.'}
          </p>
 
      </div>
    </div>
  </div>
</div>

  )
}

export default Hero
