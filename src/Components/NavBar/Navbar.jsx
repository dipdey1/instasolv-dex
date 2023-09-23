import './Navbar.scss'
import { useAuth } from '../../Utils/AuthContext';
import { Sling as Hamburger } from 'hamburger-react'
import { useState } from 'react';
import { GiLightningHelix } from 'react-icons/gi';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'

const NavbarMenu = ({routingStatusReal}) => {
  const {user, handleLogout, buttonSpin, activeDexID, routingStatus, handleRoutingON, handleRoutingOFF} = useAuth()
  const [isOpen, setOpen] = useState(false)

  return (
    <div>
    <div className='navbar'>
      <div className='logo'><h6>This is my company logo</h6></div>
      <div className='links'><h6>These are my links</h6></div>
      <div className='wallet'><h6>Wallet</h6></div>
      <div className='logout'><h6>Logout</h6></div>
      <div className='support-settings'><h6>support & Settings</h6></div>
    </div>
    <div className='mobile-navbar'>
      <div className='logo-mobile'>
        <GiLightningHelix className='logo'/><span className='appname'>InstaSolv Dex</span>
      </div>
      <div><Hamburger size={20} toggled={isOpen} toggle={setOpen}/></div>
    </div>
    <div className='toggle-menu'>
      {routingStatus ? <button onClick={(e) => handleRoutingOFF(e,user.$id)}>Turn Routing Off</button> : <button onClick={(e) =>handleRoutingON(e,user.$id)}>Turn Routing On</button>}
      <div className={isOpen ? 'menu-container' : 'close-menu-container' }>
        <div className='mob-link'>
          <div><h3>Profile</h3></div>
          <div><h3>Statistics</h3></div>
          <div><h3>History</h3></div>
        </div>
        <div className='mob-wallet-support'>
          <div><h3>Wallet</h3></div>
          <div><h3>Settings & Support</h3></div>
        </div>
        <div className='signing-button-div'>
          {user? <button onClick={handleLogout} className='logout'>{buttonSpin? <TailSpin style={{height:'25px'}}/>: <span>Logout</span>}</button> : null} 
        </div>
        <h6 style={{textAlign:'center'}}>All right reserved.</h6>
        </div>
      </div>
    
    </div>
  )
}

export default NavbarMenu