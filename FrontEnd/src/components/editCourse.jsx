import * as React from 'react';
import { useState } from 'react';
import { useParams  } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {LinearLoading , LinearBuffer } from './Loading';
import Grid from '@mui/material/Grid2';

function EditCourse(){
    const { CourseId } = useParams();
    const [course , setCourse ] = useState({});
    const[title,setTitle] = useState(course.title);
    const[description,setDescription] = useState(course.description);
    const[price,setPrice] = useState(course.price);
    const[imageLink,setImageLink] = useState(course.imageLink);
    const[published,setPublished] = useState(course.published==true?'a':'b');
    const[err,setErr] = useState(false);
    const handleChange = (event) => {
        setPublished(event.target.value);
      };
    React.useEffect(()=>{
        axios.get("https://course-selling-app-api.onrender.com/admin/courses/"+CourseId,{
            headers:{
                authorize:"Bearer "+localStorage.getItem("token")
            }            
        }).then((response)=>{
            setCourse(response.data.course);  
            setTitle(response.data.course.title);
            setDescription(response.data.course.title);
            setPrice(response.data.course.price);
            setImageLink(response.data.course.imageLink);
        }).catch(()=>setErr(true));
        
    },[])

    function update(){
        axios.put("https://course-selling-app-api.onrender.com/admin/courses/"+CourseId,{
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
        ).then((response)=>{
            
        }).catch(()=>setErr(true));

    }

    if(err) return <LinearBuffer />

    return <div style={{background:"inherit" ,display:"flex", height:"100vh" }}>
                
                        <Card style={{margin:"1% 1%"}} sx={{ width:"50%" , boxShadow:10 ,}}>
                          <CardMedia
                            component="img"
                            alt="green iguana"
                            height="50%"
                            image={course.imageLink}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {title}
                              
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {description}
                              {console.log("description Changed ")}
                            </Typography>
                          </CardContent>
                        </Card>
               

               
                        <Card style={{margin:"1% 1%"}} sx={{ width:"50%" , boxShadow:10 }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,marginBottom:"10px"}} style={{justifyContent:"center"}}>
                                Add the Course
                        </Typography>
                            <TextField id="outlined-basic" onChange={(e)=>setTitle(e.target.value)} type="text" label="Title" variant="outlined" defaultValue={title} sx={{ margin:"1vh auto", width:"100%"}}  /> <br />
                            <TextField id="outlined-basic" onChange={(e)=>setDescription(e.target.value)} type="text" label="Description" variant="outlined" defaultValue={description}  sx={{ margin:"1vh auto", width:"100%"}}  /> <br />
                            <TextField id="outlined-basic" onChange={(e)=>setPrice(e.target.value)} type="number" label="Price" variant="outlined"  defaultValue={price} sx={{ margin:"1vh auto", width:"100%"}}  /> <br />
                            <TextField id="outlined-basic" onChange={(e)=>setImageLink(e.target.value)} type="url" label="ImageLink" variant="outlined"  defaultValue={imageLink}  sx={{ margin:"1vh auto", width:"100%" }} /> <br />
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                                        <FormControlLabel value={true} control={<Radio checked={published === 'a'} onChange={handleChange} value="a" name="radio-buttons" inputProps={{ 'aria-label': 'A' }} />} label="Published" />
                                        <FormControlLabel value={false} control={<Radio checked={published === 'b'} onChange={handleChange} value="b" name="radio-buttons" inputProps={{ 'aria-label': 'B' }} />} label="Not Published" />
                                    </RadioGroup>
                            </FormControl>
                            <Button variant="contained"  onClick={update} style={{display:"flex" , justifyContent:"center"}} >Add Course</Button>    
                            {console.log("Inside Card ")}
                        </Card>

    </div>

}



export default EditCourse;