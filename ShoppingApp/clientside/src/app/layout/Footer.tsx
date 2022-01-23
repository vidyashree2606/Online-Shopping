import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

export default function Footer() {
    return <footer style={{position:'static'}} >
        <Box px={{xs: 3, sm: 10}}
             py={{xs: 5, sm: 12}}
             justifyContent='static'
             height='-250px'
             position= 'static'
             bottom='0'
        bgcolor="black" color="white">
           <Container maxWidth="sm">
               <Grid container spacing={5}>
                   <Grid item xs={12} sm={4}>
                       <Box borderBottom={1}>Help</Box>
                       <Box>
                           <Link href="/" color="inherit">Contact</Link>
                            </Box>
                            <Box>
                           <Link href="/" color="inherit">About Us</Link>
                            </Box>
                            <Box>
                           <Link href="/" color="inherit">Support</Link>
                            </Box>
                            <Box>
                           <Link href="/" color="inherit">Privacy</Link>
                            </Box>
                   </Grid>
                   <Grid item xs={12} sm={4}>
                       <Box borderBottom={1}>Help</Box>
                       <Box>
                           <Link href="/" color="inherit">Account</Link>
                            </Box>
                            <Box>
                           <Link href="/" color="inherit">Login</Link>
                            </Box>
                            <Box>
                           <Link href="/" color="inherit">Register</Link>
                            </Box>
                            <Box>
                           <Link href="/" color="inherit">Messages</Link>
                            </Box>
                   </Grid>
               </Grid>
               <Box textAlign="center" pt={{xs: 5, sm: 12 }} pb={{xs: 5, sm: 0}}>
                   Material UI &reg; {new Date().getUTCFullYear()}
               </Box>
               </Container> 
        </Box>
    </footer>  
}

