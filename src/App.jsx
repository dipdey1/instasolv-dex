import './App.css'
import PrivateRoutes from './Components/PrivateRoutes';
import { AuthProvider } from './Utils/AuthContext';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <AuthProvider>
      
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route element={<PrivateRoutes/>}>
          <Route path='/home' element={<Home/>}/>
          </Route>
      </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
