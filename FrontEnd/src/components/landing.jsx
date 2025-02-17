import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Loading from './Loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { course } from '../store/atoms/course'
import { useRecoilState } from 'recoil';



function Landing(){
    
    const [ courses , setCourses] = useRecoilState(course);
    
    React.useEffect(()=>{
        const fetchResponse = async()=>{ 
          try
            {
            const res = await axios.get('http://localhost:3000/',{
            headers:{
                Accept : "application/json"
            }
        });
         var tempCourse = res.data.courses;
        setCourses({course:tempCourse,isLoading:false})

        console.log(JSON.stringify(tempCourse),"\n");
        
      }
         catch(err){
          console.log("error in fetching ==>"+err);
        }
        
        
        
      }

      fetchResponse();
      
    } , [] );

     
    
   if(courses.isLoading) {
    return <>
      <Loading />
    </>
   }
    return <div style={{background:"inherit"}}>
                
                <Typography  align="center" varient="h4" style={{paddingTop:24 , paddingBottom:24}}>
                    Show Courses Page
                </Typography>

                <div  style={{ display:"flex",  flexWrap:"wrap" , justifyContent:"center" }}>
                    {courses.length === 0? "No Courses Found":courses.course.map((element)=>{return <LoadCourses   key={element.courseId} course={element} /> } ) }
                </div>
                
        
        </div>
    
}

function LoadCourses(props){
    const navigate = useNavigate();
    
    
    const element = props.course;
    if(element.isLoading){
        return <Loading/>
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
        <Button onClick={()=>{navigate("/signup")}}  size="small">Buy</Button>
      </CardActions>
    </Card>
    )

}

export default Landing;

