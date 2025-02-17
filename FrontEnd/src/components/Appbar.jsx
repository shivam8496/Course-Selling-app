import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate }  from 'react-router-dom'

function ResponsiveAppBar() {
  
  const isLogged =  () => {
    const data = localStorage.getItem("token");
    if(data) return <LogOut />;
    else return<>
    <LogIn />
    <SignUp />
    </>
}
 
  
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" >
      <Toolbar color="inherit">
        <Typography variant="h6" component="div"  sx={{ flexGrow: 1 }}>
          <Home />
        </Typography>
        
          {isLogged()}        

      </Toolbar>
    </AppBar>
  </Box>
  );
}

function LogOut(){
  return <>
    <Button color="inherit" onClick={()=>{localStorage.clear(); location.reload(); console.log("LoggedOut")}} >LogOut</Button>
  </>
}

function LogIn(){
  const navigate = useNavigate();
  return <>
        <Button color="inherit" onClick={()=>{navigate("/signin"); console.log("navigated to SignIN")}} >Login</Button>
      </>

}

function SignUp(){
  const navigate = useNavigate();
  return <>
        <Button color="inherit" onClick={()=>{navigate("/signup"); console.log("navigated to SignUP") }} >SignUp</Button>
      </>

}
function Home(){
  const navigate = useNavigate();
  return <>
  <Button color="inherit" onClick={()=>{navigate("/"); console.log("navigated to Home") }} sx={{fontSize:"1.2rem"}}>
  Coursera
  </Button>
  </>
  
} 

export default ResponsiveAppBar;
