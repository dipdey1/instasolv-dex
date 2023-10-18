import { useEffect } from "react"
import DoubtBar from "../../Components/DoubtBar/DoubtBar"
import NavbarMenu from "../../Components/NavBar/Navbar"
import Sidebar from "../../Components/SideBar/Sidebar"
import './Home.scss'


const Home = () => {

  useEffect

  return (
    <div className="body">
      <NavbarMenu className='navbar'/>
      <div className="dashboard">
        <div className='doubtBar'><DoubtBar/></div>
        <div  className='sidebar'><Sidebar/></div>
      </div>
    </div>
  )
}

export default Home