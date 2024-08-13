import logo from './logo.svg';
import './App.css';
import React from 'react';
import Com from './Com';
import axios from 'axios';
import First from './context/First'
import { connect } from 'react-redux';
import { selectsong,insertsong,newins,deletesong } from './actions';
import { useEffect } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button
} from '@chakra-ui/react'
import Item from './Components/Item';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from './functions/Func';
import Nav from './Components/Nav';
import Single from './Components/Single';
function App(props) {
const [loading,setloading] = React.useState(true)
const [data,setdata] = React.useState([])
const [tvdata,settvdata] = React.useState([])
const [persondata,setpersondata] = React.useState([])
console.log(data)
let navigate = useNavigate();
let i =0;
let tvi = 0;
let personi = 0;
useEffect(() => {

  setloading(false);
  fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=3dbf1b3702492e27db2c07eaadcbae76").then(function(res)  {
    return res.json();
  }).then(data => {
    setdata(data.results);
  });



  ///////////////load tv shows

  fetch("https://api.themoviedb.org/3/trending/tv/week?api_key=3dbf1b3702492e27db2c07eaadcbae76").then(function(res)  {
    return res.json();
  }).then(data => {
    settvdata(data.results);
  });




  /////////// showpersons
  fetch("https://api.themoviedb.org/3/trending/person/week?api_key=3dbf1b3702492e27db2c07eaadcbae76").then(function(res)  {
    return res.json();
  }).then(data => {
    console.log(data)
    setpersondata(data.results);
  });
},[]);
let funcdata = data.map(ele => {
  if(i < 8){
    i++;
  return(
    <React.Fragment key={ele.id}>
     <div>
          <Single id={ele.id} shown="true" poster={"https://image.tmdb.org/t/p/w500/"+ele.poster_path} title={ele.title} rating={parseInt(ele.vote_average).toFixed(1)} kind="movie"/>
        </div>
    </React.Fragment>
  )
}
})

let functvdata = tvdata.map(ele => {
  if(tvi < 8){
    tvi++;
  return(
    <React.Fragment key={ele.id}>
     <div>
          <Single id={ele.id} shown="true" poster={"https://image.tmdb.org/t/p/w500/"+ele.poster_path} title={ele.title} rating={parseInt(ele.vote_average).toFixed(1)} kind="show"/>
        </div>
    </React.Fragment>
  )
}
})


let funcpersondata = persondata.map(ele => {
  if(personi < 8){
    personi++;
  return(
    <React.Fragment key={ele.id}>
     <div>
          <Single id={ele.id} shown="false" poster={"https://image.tmdb.org/t/p/w500/"+ele.profile_path} title={ele.name} rating={parseInt(ele.vote_average).toFixed(1)} kind="people"/>
        </div>
    </React.Fragment>
  )
}
})

if (loading) {
  return <div>Loading...</div>;
}
if(checkLogin()){
    return (
      <>
      
         <Nav act="home"/>
      <section className='movies'> 
      <div className='one'>
        <h5>Trending Movies
        To Watch Right Now</h5>
        <span className='sub'>
        Most watched Movies by Days
        </span>
      </div>
   
       {funcdata}
      </section>



      <section className='movies'> 
      <div className='one'>
        <h5>Trending tv-shows
        To Watch Right Now</h5>
        <span className='sub'>
        Most watched tv-shows by Days
        </span>
      </div>
   
        {functvdata}
  
      </section>






      <section className='movies'> 
      <div className='one'>
        <h5>Trending people
        To follow</h5>
        <span className='sub'>
        Most trending peoples by Days
        </span>
      </div>
   
        {funcpersondata}
      </section>
      </>
    );
  }else{
    navigate('/login');
  }
  }



export default App