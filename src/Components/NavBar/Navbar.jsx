import './Navbar.scss'
import { useAuth } from '../../Utils/AuthContext';
import { Sling as Hamburger } from 'hamburger-react'
import { useState } from 'react';
import {FiLogOut} from 'react-icons/fi';
import {IoSettings} from 'react-icons/io5';
import {RiShutDownLine} from 'react-icons/ri'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'
import { Link } from 'react-router-dom';
import {LogoAppleAr} from '@styled-icons/ionicons-solid/LogoAppleAr'
import {LightningChargeFill} from '@styled-icons/bootstrap/LightningChargeFill'
import {PersonAccounts} from '@styled-icons/fluentui-system-filled/PersonAccounts'
import {StatsBars} from '@styled-icons/icomoon/StatsBars'
import {ClockHistory} from '@styled-icons/bootstrap/ClockHistory'
import {Wallet2} from '@styled-icons/bootstrap/Wallet2'

const NavbarMenu = () => {
  const {user, handleLogout, buttonSpin, routingStatus, handleRoutingON, handleRoutingOFF} = useAuth()
  const [isOpen, setOpen] = useState(false)

  return (
    <div className='parent'>
    <div className='navbar'>
      <div className='logo'><LogoAppleAr size={60}/><span>Creative Code</span></div>
      <div className='links'>
        <div className='core-link'><Link to='/profile' className='core-link-ds'>Profile</Link></div>
        <div className='core-link'><Link to='/stats' className='core-link-ds'>Stats</Link></div>
        <div className='core-link'><Link to='/history' className='core-link-ds'>History</Link></div>
        <div className='core-link'><Link to='/wallet' className='core-link-ds'>Wallet</Link></div>
      </div>
      <div className='right-toggle'>
      <div className='routing-toggle'>
      {routingStatus ? <button className='stop-routing-lg' onClick={(e) => handleRoutingOFF(e,user.$id)}><RiShutDownLine/></button> : <button className='routing-on-lg' onClick={(e) =>handleRoutingON(e,user.$id)}><LightningChargeFill size={25}/></button>}
      </div>
      <div className='logout'>
      {user? <button onClick={handleLogout} className='logout-lg'>{buttonSpin? <TailSpin style={{height:'25px'}}/>: <span className='logout-span'><FiLogOut className='logout-icon'/></span>}</button> : null}
      </div>
      <div className='support-settings'>
        <Link><IoSettings className='settings'/></Link>
      </div>
      </div>
    </div>
    <div className='tablet-navbar'>
    <div className='logo-tablet'>
      <div className='logo'><LogoAppleAr size={30}/><span>Creative Code</span></div>
    </div>
    <div className='links-tablet'>
      <Link className='link-tab' to='/profile'><PersonAccounts size={22}/></Link>
      <Link className='link-tab' to='/stats'><StatsBars size={22}/></Link>
      <Link className='link-tab' to='/history'><ClockHistory  size={22}/></Link>
    </div>
    <div className='right-toggle'>
      <div className='routing-toggle'>
      {routingStatus ? <button className='stop-routing-lg' onClick={(e) => handleRoutingOFF(e,user.$id)}><RiShutDownLine size={14}/></button> : <button className='routing-on-lg' onClick={(e) =>handleRoutingON(e,user.$id)}><LightningChargeFill size={15}/></button>}
      </div>
      <div className='logout'>
      {user? <button onClick={handleLogout} className='logout-lg'>{buttonSpin? <TailSpin style={{height:'25px'}}/>: <span className='logout-span'><FiLogOut className='logout-icon'/></span>}</button> : null}
      </div>
      <div className='support-settings'>
        <Link><IoSettings className='settings'/></Link>
      </div>
      </div>
    </div>
    
    <div className='mobile-navbar'>
      <div className='logo-mobile'>
      <div className='logo'><LogoAppleAr size={30}/><span>Creative Code</span></div>
      </div>
      <div className='right-box'>
      <div className='routing-toggle'>
          {routingStatus ? <button className='stop-routing' onClick={(e) => handleRoutingOFF(e,user.$id)}><RiShutDownLine size={14}/></button> : <button className='routing-on' onClick={(e) =>handleRoutingON(e,user.$id)}><LightningChargeFill size={15}/></button>}
      </div>
        <Hamburger className='hamburger' color='#19A7CE' size={20} toggled={isOpen} toggle={setOpen}/>
      
      </div>
    </div>
    <div className='toggle-menu'>
      <div className={isOpen ? 'menu-container' : 'close-menu-container' }>
        <div className='mob-link'>
        <Link className='link-tab' to='/profile'><PersonAccounts size={22}/></Link>
        <Link className='link-tab' to='/stats'><StatsBars size={22}/></Link>
        <Link className='link-tab' to='/history'><ClockHistory  size={22}/></Link>
        </div>
        <div className='support-settings'>
        <Link><IoSettings className='settings'/></Link>
      </div>
      <div className='logout'>
      {user? <button onClick={handleLogout} className='logout-lg'>{buttonSpin? <TailSpin style={{height:'25px'}}/>: <span className='logout-span'><FiLogOut className='logout-icon'/></span>}</button> : null}
      </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarMenu