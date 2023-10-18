import './App.css'
import PrivateRoutes from './Components/PrivateRoutes';
import { AuthProvider } from './Utils/AuthContext';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import VideoRoom from './Pages/VideoRoom/VideoRoom';
import { DoubtProvider } from './Utils/DoubtContext';


function App() {

  return (
    <Router>
      <AuthProvider>
        <DoubtProvider>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route element={<PrivateRoutes/>}>
          
            <Route path='/home' element={<Home/>}/>
            <Route path='/room/:roomId' element={<VideoRoom/>}/>
          
          </Route>
      </Routes>
      </DoubtProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
