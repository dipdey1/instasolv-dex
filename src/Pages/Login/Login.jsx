import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Utils/AuthContext'
import './login.scss'
import { useEffect,useState } from 'react'
import LoginAnimation from '../../assets/LoginAnimation'
import { FcGoogle } from 'react-icons/fc'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'

const Login = () => {

  const {user, handleLogin, buttonSpin,error} = useAuth()
  const navigate = useNavigate()
  const [loginCredentials, setLoginCredentials] = useState({
    'email':'',
    'password':''
  })

  useEffect(() => {
    if(user){
      navigate('/home')
    }
  },[])

  const handleCredentials = (e) => {
    setLoginCredentials({...loginCredentials,[e.target.name]: e.target.value})
  }


  return (
    <>
    <div className='body-box'>
    <div className='primary-container'>
      <div className='left-container'>
          <LoginAnimation className='animation'/>
        </div>
      <div className='right-container'><form onSubmit={(e) => handleLogin(e,loginCredentials)}>
            <div className='header'><span>Login to InstaSolve</span></div>
            <div className='google-login'><button><FcGoogle size={'20px'}/> <span style={{paddingLeft:'5px'}}>Sign in with Google</span></button></div>
        <div className='input-primary'>
        <div className='input-container'>
          <label htmlFor="email">Enter your email</label>
          <input type="email" autoFocus id='email' name='email' value={loginCredentials.email} onChange={handleCredentials} autoComplete='on' required/>
        </div>
        <div  className='input-container'>
          <label htmlFor="password">Enter your Password</label>
          <input type="password" autoFocus id='password' name='password' value={loginCredentials.password} onChange={handleCredentials} autoComplete='on' required/>
        </div>
        </div>
        <div>
            <div  className='login-button'>
              <button type='submit' id="login-button">{buttonSpin? <TailSpin style={{height:'25px'}}/> : <span>Login</span>}</button>
            </div>
            {error !== null ? <p style={{textAlign:'center',paddingTop:'5px',color:'red'}}>Email or password entered is incorrect</p>: null}
            <div className='register'>
              <div><Link>Forgot password?</Link></div>
              <div><span>Do not have an account? <Link to='/register'>Register</Link></span></div>
            
            </div>
        </div>
      </form>
      </div>
      </div>
      </div>
    </>
  )
}

export default Login