import axios from 'axios';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';


function CreateCourse(){

    const navigate = useNavigate();
    const[title,setTitle] = useState("Default Title");
    const[description,setDescription] = useState("Default Title");
    const[price,setPrice] = useState(0);
    const[imageLink,setImageLink] = useState("https://LinketoImage.com");
    const[published,setPublished] = useState('a');
    

  const handleChange = (event) => {
    setPublished(event.target.value);
  };
    
    const addCourse = async () => {
       try {
        var response = await axios.post(`https://course-selling-app-api.onrender.com/admin/courses`,{
            // Body data
            title:title,
            description:description,
            price:price,
            imageLink:imageLink,
            published:(published === 'a') ? true : false
            
          },
          {
            // Configuration object with headers
            headers: {
            //   'Content-Type': 'application/json',
              authorize:"Bearer " + localStorage.getItem("token")
            },
          }
        )}
        catch (err){console.log("err occurred ==>"+err)}
        
        if(response) {
          alert(`Course ${response.data.courseId} added Succesfully!!!`);
          navigate('/courses');
        }
      }
      
        
    
    
    
    return (
        <div style={{display:"flex", justifyContent:"center" , background:"inherit"}}>

             

                 <Box sx={{  maxWidth:"80vh" , minWidth:"50vh" , margin:"15vh" }} style={{ justifyContent:"center"}} >
                        
                        
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,marginBottom:"10px"}} style={{justifyContent:"center"}}>
                                Add the Course
                        </Typography>
                        <Card variant="outlined" sx={{  padding:"1vh",paddingRight:"auto" }}style={{justifyContent:"center"}}>
                            <TextField id="outlined-basic" onChange={(e)=>setTitle(e.target.value)} type="text" label="Title" variant="outlined" defaultValue="Default Title" sx={{ margin:"1vh auto", width:"100%"}}  /> <br />
                            <TextField id="outlined-basic" onChange={(e)=>setDescription(e.target.value)} type="text" label="Description" variant="outlined" defaultValue="Default Description"  sx={{ margin:"1vh auto", width:"100%"}}  /> <br />
                            <TextField id="outlined-basic" onChange={(e)=>setPrice(e.target.value)} type="number" label="Price" variant="outlined"  sx={{ margin:"1vh auto", width:"100%"}}  /> <br />
                            <TextField id="outlined-basic" onChange={(e)=>setImageLink(e.target.value)} type="url" label="ImageLink" variant="outlined"  defaultValue="https://LinketoImage.com"  sx={{ margin:"1vh auto", width:"100%" }} /> <br />
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                                        <FormControlLabel value={true} control={<Radio checked={published === 'a'} onChange={handleChange} value="a" name="radio-buttons" inputProps={{ 'aria-label': 'A' }} />} label="Published" />
                                        <FormControlLabel value={false} control={<Radio checked={published === 'b'} onChange={handleChange} value="b" name="radio-buttons" inputProps={{ 'aria-label': 'B' }} />} label="Not Published" />
                                    </RadioGroup>
                            </FormControl>
                            <Button variant="contained" onClick={addCourse} style={{display:"flex" , justifyContent:"center"}} >Add Course</Button>    
                        </Card>
                                
                </Box>
                
                
            
        </div>

    )
}



export default CreateCourse;