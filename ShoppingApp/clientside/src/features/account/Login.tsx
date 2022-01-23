import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Link, useHistory} from 'react-router-dom';
import { useState } from 'react';
import apihandler from '../../app/api/apihandler';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';
import { Provider } from 'react-redux';






export default function Login() {
  
const history = useHistory();

const dispatch = useAppDispatch();
const theme = createTheme();
  const {register,handleSubmit,formState:{isSubmitting,errors,isValid}}=useForm({mode:'all'});
  async function submitForm(data:FieldValues){

   await dispatch(signInUser(data));
   history.push('/catalog')
  }


  // const [values,setValues] = useState({
  //   username: '',
  //   password: ''
  // });
  // const handleSubmit = (event:any) => {
  //   // console.log(values);
  //   event.preventDefault();
  //   apihandler.Account.login(values)
  //   // eslint-disable-next-line no-console
  // };

  // function handleInputChange(event:any){
  //   const {name,value} = event.target;
  //   setValues({...values,[name]:value});
  // }

  return (
    <ThemeProvider theme={theme}>
      <Container component={Paper} maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
        <CssBaseline />
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
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="User Name"
              autoFocus
              {...register('username',{required:'User Name Required'})}
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              {...register('password',{required:'Password Required'})}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton loading={isSubmitting}
            disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </LoadingButton>
            <Grid container>
              
              <Grid item>
                <Link to='/register'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}