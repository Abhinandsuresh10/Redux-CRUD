
import { createRoot } from 'react-dom/client'
import {
   RouterProvider,
   createRoutesFromElements,
   Route, 
   createBrowserRouter} from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminHome from './screens/AdminHome.jsx'
import AdminLogin from './screens/AdminLogin.jsx';
import EditUserScreen from './screens/EditUserScreen.jsx';
import AddUserScreen from './screens/AddUserScreen.jsx';
import AdminPrivateRoute from './components/AdminPrivateRoute.jsx';
import ErrorPage from './components/ErrorPage.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />}/>
      <Route path='/register' element={<RegisterScreen />} />
      {/* user private routes */}
      <Route path='' element={<PrivateRoute/>} >
      <Route path='/profile' element={<ProfileScreen />} />
      </Route>  
      <Route path='/admin' element={<AdminLogin />} />
       {/* admin private routes */}
      <Route path='' element={<AdminPrivateRoute />}>
      <Route path='/dashboard' element={<AdminHome />} />
      <Route path='/edit-user/:userId' element={<EditUserScreen />} />
      <Route path='/add-user' element={<AddUserScreen />} />
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <StrictMode >
     <RouterProvider router={router} />
     </StrictMode>
  </Provider>

)
