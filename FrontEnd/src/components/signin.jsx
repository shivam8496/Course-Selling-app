import axios from 'axios';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {userState}  from '../store/atoms/users';

function Signin(){

    const navigate = useNavigate();
    const[email,setEmail] = useState("");
    const[password,setpassword] = useState("");
    
    const register = () => {
        axios.post(`http://localhost:3000/admin/login`,{
            username:email,
            password:password,
        }).then((response)=>{
            localStorage.setItem("token" , response.data.token);
            navigate('/courses');
        });
    }
    
    
    return (
        <div style={{display:"flex", justifyContent:"center" , background:"inherit"}}>

             

                 <Box sx={{  maxWidth:"80vh" , minWidth:"50vh" , margin:"25vh" }} style={{ justifyContent:"center"}} >
                        
                        
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,marginBottom:"10px"}} style={{justifyContent:"center"}}>
                                Welcome back to the Coursera
                        </Typography>
                        <Card variant="outlined" sx={{  padding:"1vh",paddingRight:"auto" }}style={{justifyContent:"center"}}>
                            <TextField id="outlined-basic" onChange={(e)=>setEmail(e.target.value)} type="email" label="Email" variant="outlined" sx={{ margin:"1vh auto", width:"100%"}}  /> <br />
                            <TextField id="outlined-basic" onChange={(e)=>setpassword(e.target.value)} type="password" label="password" variant="outlined" sx={{ margin:"1vh auto", width:"100%" }} /> <br />
                            <Button variant="contained" onClick={register} style={{display:"flex" , justifyContent:"center"}} >Signin</Button>    
                        </Card>
                                
                </Box>
                
                
            
        </div>

    )
}



export default Signin;