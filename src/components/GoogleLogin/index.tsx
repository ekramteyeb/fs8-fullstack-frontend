import axios from 'axios'
import { useDispatch } from 'react-redux'
import { GoogleLogin } from 'react-google-login'
import { refreshTokenSetup } from '../../utils/refreshTokenSetup'
import { addUser } from '../../redux/actions'
import dotenv from 'dotenv'
//import { Service } from '../../utils/service'
import { BASE_URL } from '../../resources'

import './style.scss'

dotenv.config()
function Login() {
  //const service = new Service()
  const clientId : string | any = process.env.client_id
  const dispatch = useDispatch()
  const onSuccess = async (response: any) => {
    let res = await axios.post(
      `${BASE_URL}/users/google`,
      {id_token:response.tokenObj.id_token}
    )
    refreshTokenSetup(response);
    //set the state
    const loggedinUser = {
      ...res.data.user, 
      googleId :response.googleId, 
      token :res.data.token
    }
    dispatch(addUser(loggedinUser))
    localStorage.setItem('loggedinUser', JSON.stringify(loggedinUser))
    window.location.replace('/')
  }

  const onFailure = (res:any) => {
    alert(
      `Failed to login.Please try again`
    );
  };

  return (
    <div className='login'>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login using your google acount"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;