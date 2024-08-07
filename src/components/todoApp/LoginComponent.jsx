import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../security/AuthContext';

export default function LoginComponent() {

    let [loginInfo, setLoginInfo] = useState({
      username:"",
      password:""
    });
  
    let navigate = useNavigate();

    let authContext = useAuth();

    let [isLoginFailed, setLoginFailed] = useState(false);
  
    function handleLoginInfo(event) {
  
      let {id, value} = event.target;
  
      setLoginInfo((prevVal) => {
        return {
          ...prevVal,
          [id]:value
        }
      })
    }
  
    async function handleLogin(event) {
      event.preventDefault();
      const loginResult = await authContext.login(loginInfo);

      if(loginResult) {
        navigate(`/welcome/${loginInfo.username}`);
      } else {
        setLoginFailed(true);
      }
    }
  
    return (
      <div className="LoginComponent">
        <div className='LoginStatus'>
          {!authContext.isAuthenticated && isLoginFailed && 'Authentication Failed. Please Check your credentials'}
        </div>
        <form onSubmit={handleLogin}>
          <label htmlFor='username'>Username</label>
          <input onChange={handleLoginInfo} type='text' id='username' placeholder='Username' value={loginInfo.username}></input><br />
          <label htmlFor='password'>Password</label>
          <input onChange={handleLoginInfo} type='password' id='password' placeholder='Password' value={loginInfo.password}></input><br/>
          <input type='submit' value='Login'></input>
        </form>
      </div>
    )
  }