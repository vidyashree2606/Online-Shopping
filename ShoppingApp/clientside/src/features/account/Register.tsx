import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import apihandler from "../../app/api/apihandler";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../app/store/configureStore";
import { signInUser } from "./accountSlice";
import { Provider } from "react-redux";
import { toast } from "react-toastify";

export default function Register() {
  // const history = useHistory();

  // const dispatch = useAppDispatch();
  const theme = createTheme();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({ mode: "all" });


  function handleApiErrors(errors:any){
      console.log(errors);
      if (errors){
        errors.forEach((error: string) => 
            {
                if (error.includes('Password')) {
                    setError('password', { message: error })
                } else if (error.includes('Email')) {
                    setError('email', { message: error })
                } else if (error.includes('Username')) {
                    setError('username', { message: error })
                }
            }
        );
      }
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
      <Container
        component={Paper}
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit((data) => apihandler.Account.register(data)
                .then(()=>
                {
                    toast.success('Registration successfull')
                })
                .catch(error=>handleApiErrors(error)))}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="User Name"
              autoFocus
              {...register("username", { required: "User Name Required" })}
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Id"
              {...register("email", { 
                  
                required: "Email Required" ,
                // pattern: {
                //     value: /^\w+[\w-.]*@\w+((-\w+)|(\w*)).[a-z]{2,3}$/,
                //     message: 'Not a valid email address'
                // } 
            
            })}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              {...register("password", { required: "Password Required" })}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <LoadingButton
              loading={isSubmitting}
              disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </LoadingButton>
            <Grid container>
              <Grid item>
                <Link to="/login">{"Already have an account? LogIn"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
