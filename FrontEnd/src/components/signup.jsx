import axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { userState } from '../store/atoms/users';
import { useRecoilState } from 'recoil';
import { Alert } from '@mui/material';



function Signup(){
    const navigate = useNavigate();
    const[email,setEmail] = useState("");
    const[password,setpassword] = useState("");
    const[user,setUser] = useRecoilState(userState);
    // const [user, setUser] = useRecoilState(userState);
    const register = () => {
        
        axios.post(`https://course-selling-app-api.onrender.com/admin/signup`,{
            username:email,
            password:password,
        }).then((response)=>{
            console.log(response);
            localStorage.setItem("token" , response.data.token);
            setUser({
                username:email,
                isLoading:false
            });
            navigate('/courses');
            
        }).catch(()=>{setUser({
            username:email,
            isLoading:false
        })})
        
    }

    
    return (
        
        <div style={{display:"flex",background:"inherit" , justifyContent:"center"}}>
        
            
            
            
                 <Box sx={{  maxWidth:"80vh" , minWidth:"50vh" , margin:"25vh" }} style={{ justifyContent:"center"}} >
                        <RenderAlert gg={user.username}/>
                        
                        
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,marginBottom:"10px"}} style={{justifyContent:"center"}}>
                                Welcome  to the Coursera
                        </Typography>
                        <Card variant="outlined" sx={{  padding:"1vh",paddingRight:"auto" }}style={{justifyContent:"center"}}>
                            <TextField id="outlined-basic" onChange={(e)=>setEmail(e.target.value)} type="email" label="Email" variant="outlined" sx={{ margin:"1vh auto", width:"100%"}}  /> <br />
                            <TextField id="outlined-basic" onChange={(e)=>setpassword(e.target.value)} type="password" label="password" variant="outlined" sx={{ margin:"1vh auto", width:"100%" }} /> <br />
                            <Button variant="contained" onClick={register} style={{display:"flex" , justifyContent:"center"}} >Signup</Button>    
                        </Card>
                                
                </Box>
                
                
            
        </div>

    )
}
function RenderAlert(props){
    if(props.gg) return <Alert variant='filled' severity='error' style={{display:"flex", justifyContent:"center"}} >{props.gg} already Exits </Alert>
    else <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,marginBottom:"10px"}} style={{justifyContent:"center"}}>
    Welcome  to the Coursera
</Typography>
}

export default Signup;