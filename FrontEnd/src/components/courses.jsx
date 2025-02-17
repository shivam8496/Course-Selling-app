import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Loading from './Loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {course} from '../store/atoms/course'

function Courses(){
    const [courses,setCourses] = useRecoilState(course);;
    const navigate = useNavigate();
    function addCourse(){
        navigate('/createcourses');
    }

    React.useEffect(()=>{
        const fetchResponse = async()=>{ 
          try
            {
            const res = await axios.get('https://course-selling-app-api.onrender.com/admin/courses',{
            headers:{
                authorize:"Bearer " + localStorage.getItem("token")
            }
        })
        setCourses({course:res.data.courses,isLoading:false});
      }
         catch(err){
          console.log("error in fetching ==>"+err);
        }
      
      }

      fetchResponse();

    } , [] ) ;

    if(!courses.isLoading)
    return <div style={{background:"inherit"}}>
                
                <Typography  align="center" varient="h4" style={{paddingTop:24 , paddingBottom:24}}>
                    Show Courses Page
                </Typography>

                <div  style={{ display:"flex",  flexWrap:"wrap" , justifyContent:"center" }}>
                    {courses.length === 0? "No Courses Found":courses.course.map((element)=>{return <LoadCourses  key={element.courseId} course={element} /> } ) }
                    {/* {courses.length === 0? "No Courses Found":console.log(courses) } */}
                </div>

                <Stack direction="row" spacing={1}  style={{padding:"5%",justifyContent:"center"}}>
                    <Button variant="contained" onClick={addCourse}  size='large'>Add New Course</Button>    
                </Stack>
                
        
        </div>
    else return <Loading />
}

export  function LoadCourses(props){
    const navigate = useNavigate();
    const element = props.course;
 
    function deleted(){
        console.log("Deleted");
    }

    function publish(){
      console.log("Published");
    }

  function edit(){
    var str= '/editCourse/'+ element.courseId;
    navigate(str);  
  }
    return(
      <Card style={{margin:"1% 1%"}} sx={{  width: 345 , minWidth:400 , boxShadow:10  }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={element.imageLink}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {element.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {element.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={publish}  size="small">Publish</Button>
        <Button onClick={edit}  size="small">Edit</Button>
        <Button  onClick={deleted} size="small">Delete</Button>
      </CardActions>
    </Card>
    )



}


export default Courses;

