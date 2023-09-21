import { useEffect, useState } from 'react'
import LoginAnimation from '../../assets/LoginAnimation'
import { Link, useNavigate } from 'react-router-dom'
import'./Register.scss'
import { useAuth } from '../../Utils/AuthContext'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'

const Register = () => {

  const {user,handleRegister, buttonSpin, error} = useAuth()
  const navigate = useNavigate()
  const [registerDetails, setRegisterDetails] = useState({
    'name': '',
    'phone':'',
    'email':'',
    'password':''
  })

  useEffect(() => {
    if(user){
      navigate('/home')
    }
  },[])

  const handleRegisterDetails = (e) => {
    setRegisterDetails({...registerDetails,[e.target.name]: e.target.value})
  }


  
  return (
    <>
    <div className='body-box'>
    <div className='primary-container'>
      <div className='left-container'>
          <LoginAnimation className='animation'/>
        </div>
      <div className='right-container'>
        <form onSubmit={(e) => handleRegister(e,registerDetails)}>
        <h2 style={{textAlign:'center'}}>Register to InstaSolv Doubt Expert</h2>
        <hr />
        <div className='input-container'>
        <label htmlFor="name">Enter your full name</label>
        <input type="text" autoFocus id='name' name='name' value={registerDetails.name} onChange={handleRegisterDetails} autoComplete='on' required/>
        </div>
        <div className='input-container'>
        <label htmlFor="phone">Enter your phone</label>
        <input type='text' autoFocus id='phone' name='phone' value={registerDetails.phone} onChange={handleRegisterDetails} autoComplete='on' required 
       maxLength={15} placeholder='+919674******'/>
        </div>
        <div className='input-container'>
        <label htmlFor="email">Enter your email</label>
        <input type="email" autoFocus id='email' name='email' value={registerDetails.email} onChange={handleRegisterDetails} autoComplete='on' required/>
        </div>
        <div  className='input-container'>
        <label htmlFor="password">Enter your Password</label>
        
        <input type="password" autoFocus id='password' name='password' value={registerDetails.password} onChange={handleRegisterDetails} autoComplete='on' required/>
        </div>
        <div> 
        <div  className='login-button'>
          <button type='submit' id="login-button">{buttonSpin ? <TailSpin style={{height:'25px'}}/> : <span>Register</span>}</button>
        </div>
        {error !== null ? <p style={{textAlign:'center',paddingTop:'5px',color:'red'}}>A user with the same email already exists.</p>: null}
        <div className='register'>
          <div><span>By clicking on register, you are agreeing to our <br /><Link>Terms & Conditions</Link>, <Link>privacy policy</Link>, <Link>notification settings</Link></span></div>
          <div><span>Already have an account? <Link to='/login'>sign in</Link></span></div>
        
        </div>
        
        </div>
      </form>
      </div>
      </div>
      </div>
    </>
  )
}

export default Register