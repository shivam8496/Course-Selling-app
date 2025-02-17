import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ResponsiveAppBar from './components/Appbar'
import Signup from './components/signup'
import Signin from './components/signin'
import Landing from './components/landing'
import Courses from './components/courses';
import CreateCourse from './components/CreateCourse'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import EditCourse from './components/editCourse'


function App() {

  
  return (
    <div style={{ background: '#D4D4D4' , height:'100vh'}}>
      <RecoilRoot>
      <Router>
      <ResponsiveAppBar />
        <Routes>
          <Route path='/' element={<Landing />}/>
          <Route path='/editCourse/:CourseId'  element={<EditCourse />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/signin' element={<Signin />}/>
          <Route path='/courses' element={<Courses />}/>
          <Route path='/createcourses' element={<CreateCourse />}/>
        </Routes>
      </Router>
      </RecoilRoot>
      
          
          
     </div>
  );
}

export default App;
