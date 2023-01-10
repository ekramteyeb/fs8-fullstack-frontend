import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
/* import CssBaseline from '@mui/material/CssBaseline'; */
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/* Local components */
import Notification from '../../components/Notification'
import { addUser } from '../../redux/actions'
import { BASE_URL } from '../../resources'
import {fetchUser} from '../../utils/fetchUser'
import { loginorSignup } from '../../utils/loginorSignup'
import { useState } from 'react';
import { useDispatch } from 'react-redux';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [color, setColor] = useState(false)

  const dispatch = useDispatch()

  const clearNotify = () => {
    setTimeout(()=>{ setError('')}, 4000)
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    console.log('email', email)
    try {
      //login in 
      const returnUser = await loginorSignup(
        `${BASE_URL}/users/login`, 
        email, 
        password
      )
      //destruct id , token 
      const {id, token}  = returnUser
      if(token){
        //when login is success full fetch the user details from db
        const user = await fetchUser(id, token)
        console.log('user from login fetch', user)
        if(user){
          const loggedinUser = {...user, googleId : '',token : token}
          dispatch(addUser(loggedinUser))
          localStorage.setItem('loggedinUser', JSON.stringify(loggedinUser))
        }else{
          setError('Something went wrong, please try again.')
          clearNotify()
        }
        //then clear the form 
        setColor(true)
        setEmail('')
        setPassword('')
        setTimeout(function(){
          setError('')
          window.location.replace('/') 
        }, 5000)
        setError('Logged in   successfully') 
      }else{
        setError('Login failed email/password is not valid') 
        clearNotify()
      }
    }catch(err){
      setError('Email/password not correct, please try again.')
      clearNotify()
    }
  

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ marginTop:'60px' }}>
        
        {/* <CssBaseline /> */}
        { error ? <Notification message={error} color={color}/> : ''}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              onChange={(e) => setEmail(e.target.value) }
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              /* autoFocus */
            />
            <TextField
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}