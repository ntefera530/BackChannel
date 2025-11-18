import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useState } from 'react';
import { Lock, User } from 'lucide-react';

const LoginPage = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  const {login} = useUser(); //my User Context

  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate("/signup");
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    login(username, password)
    setUsername("");
    setPassword("");
  }

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }
  
  return (
    <div className= "min-h-screen">
      <div >Welcome to BackChannel</div>

      <form onSubmit={handleSubmit} className='space-y-6'>

        {/* Username Field} */}
        <div className='form-control'>
          <label className='label'>
            <span className='label-text font-medium'>Username</span>
          </label>

          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <User className='size-5 text-base-content/40' />
            </div>
            <input
              type="text"
              placeholder="Username"
              className= {'input input-bordered w-full pl-10'}
              value={username}
              onChange={handleChangeUsername}
            >  
            </input>
          </div>
        </div>

        {/* Password Field} */}
        <div className='form-control'>
          <label className='label'>
            <span className='label-text font-medium'>Password</span>
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Lock className='size-5 text-base-content/40' />
            </div>
            <input
              type="password"
              placeholder="Password"
              className= {'input input-bordered w-full pl-10'}
              value={password}
              onChange={handleChangePassword}
            >  
            </input>
          </div>
        </div>

        {/* Submit Button} */}
        <button className='btn btn-primary w-full' type="submit">Login</button>


        {/* Navigate to Login Page} */}
        <div className='text-center'>
          <p className='text-base-content/60'>
            Don't have an account?{' '}
            <button className='text-primary font-semibold hover:underline' onClick={goToSignUp}>
                Sign Up
            </button>
          </p>
        </div>

      </form>
    </div>
  )
}

export default LoginPage