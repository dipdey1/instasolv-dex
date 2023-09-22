import './Navbar.scss'
import { useAuth } from '../../Utils/AuthContext';
import { Sling as Hamburger } from 'hamburger-react'
import { useState } from 'react';
import { GiLightningHelix } from 'react-icons/gi';

const NavbarMenu = () => {
  const {user, handleLogout} = useAuth()
  const [isOpen, setOpen] = useState(null)

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
      <div className={isOpen === null? null: isOpen ? 'menu-container' : 'close-menu-container' }>
        <div className='mob-link'>
          <div><h3>Profile</h3></div>
          <div><h3>Statistics</h3></div>
          <div><h3>Settings</h3></div>
        </div>
        <div className='mob-wallet-support'>
          <div><h3>Wallet</h3></div>
          <div><h3>Support</h3></div>
        </div>
        </div>
      </div>
    
    </div>
  )
}

export default NavbarMenu
