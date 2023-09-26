import './Navbar.scss'
import { useAuth } from '../../Utils/AuthContext';
import { Sling as Hamburger } from 'hamburger-react'
import { useState } from 'react';
import { GiLightningHelix } from 'react-icons/gi';
import {FaPowerOff} from 'react-icons/fa6';
import {IoSettings} from 'react-icons/io5';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'
import { Link } from 'react-router-dom';

const NavbarMenu = () => {
  const {user, handleLogout, buttonSpin, routingStatus, handleRoutingON, handleRoutingOFF} = useAuth()
  const [isOpen, setOpen] = useState(false)

  return (
    <div>
    <div className='navbar'>
      <div className='logo'><GiLightningHelix className='lg-logo'/><span className='lg-appname'>InstaSolv Dex</span></div>
      <div className='links'>
        <div className='core-link'><Link to='/profile' className='core-link-ds'>Profile</Link></div>
        <div className='core-link'><Link to='/stats' className='core-link-ds'>Stats</Link></div>
        <div className='core-link'><Link to='/history' className='core-link-ds'>History</Link></div>
        <div className='core-link'><Link to='/wallet' className='core-link-ds'>Wallet</Link></div>
      </div>
      <div className='right-toggle'>
      <div className='routing-toggle'>
      {routingStatus ? <button className='stop-routing-lg' onClick={(e) => handleRoutingOFF(e,user.$id)}>Stop Doubts</button> : <button className='routing-on-lg' onClick={(e) =>handleRoutingON(e,user.$id)}>Start Doubts</button>}
      </div>
      <div className='logout'>
      {user? <button onClick={handleLogout} className='logout-lg'>{buttonSpin? <TailSpin style={{height:'25px'}}/>: <span className='logout-span'><span className='logout'>Logout</span><FaPowerOff className='logout-icon' size={20}/></span>}</button> : null}
      </div>
      <div className='support-settings'>
        <Link></Link><IoSettings className='settings'/>
      </div>
      </div>
    </div>
    <div className='mobile-navbar'>
      <div className='logo-mobile'>
        <GiLightningHelix className='logo'/><span className='appname'>InstaSolv Dex</span>
      </div>
      <div><Hamburger className='hamburger' color='#061330' size={20} toggled={isOpen} toggle={setOpen}/></div>
    </div>
    <div className='toggle-menu'>
      <div className={isOpen ? 'menu-container' : 'close-menu-container' }>
        <div className='mob-link'>
          <div><Link to='/profile' className='core-link-sm'>Profile</Link></div>
          <div><Link to='/stats' className='core-link-sm'>Statistics</Link></div>
          <div><Link to='/history' className='core-link-sm'>History</Link></div>
        </div>
        <div className='mob-wallet-support'>
          <div><Link to='/history' className='core-link-sm'>Wallet</Link></div>
          <div><Link to='/history' className='core-link-sm'>Settings</Link></div>
        </div>
        <div className='routing-div'>
          {routingStatus ? <button className='stop-routing' onClick={(e) => handleRoutingOFF(e,user.$id)}>Stop Doubts</button> : <button className='routing-on' onClick={(e) =>handleRoutingON(e,user.$id)}>Start Doubts</button>}
        </div>
        <div className='signing-button-div'>
          {user? <button onClick={handleLogout} className='logout'>{buttonSpin? <TailSpin style={{height:'25px'}}/>: <span>Logout</span>}</button> : null} 
        </div>
        </div>
      </div>
    
    </div>
  )
}

export default NavbarMenu