import DoubtBar from "../../Components/DoubtBar/DoubtBar"
import NavbarMenu from "../../Components/NavBar/Navbar"
import './Home.scss'


const Home = () => {

  
  return (
    <div className="body">
        <NavbarMenu/>

      <DoubtBar/>
    </div>
  )
}

export default Home