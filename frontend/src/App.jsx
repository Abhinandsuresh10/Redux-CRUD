import Header from "./components/Header"
import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className="p-4 bg-gray-400 min-h-screen">
     <Header />
     <ToastContainer />
     <Outlet />
    </div>
  )
}

export default App
