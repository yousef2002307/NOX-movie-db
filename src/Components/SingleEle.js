import Nav from "./Nav";
import React, { useEffect,useState } from 'react'
import '../index.css'
import { useParams } from "react-router-dom";
function SingleEle() {
    let {id , kind} = useParams();
    const [loading,setloading] = React.useState(true);
    const [data,setdata] = React.useState({});
    const [image,setimage] = React.useState(null);
    const [title,settitle] = React.useState(null);
    const [tag,settag] = React.useState(null);
    const [vote,setvote] = React.useState(null);
    const [date,setdate] = React.useState(null);
    const [votecount,setvotecount] = React.useState(null);
    const [geners,setgeners] = React.useState([]);
   let genersdata = [];
    useEffect(() => {
        if(kind=="show"){
            setloading(false);
            fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=f04abd28a278b378a10634e8da13acc0&language=en-US`).then(function(res)  {
              return res.json();
            }).then(data => {
              setdata(data.results);
              setimage(data.poster_path)
              settitle(data.name);
              settag(data.tagline)
              setvote(data.vote_average)
              setvotecount(data.vote_count)
              setdate(data.first_air_date);
              setgeners(data.genres)
             
              console.log("eners",geners)
              setloading(false);
              
    
            
             
            });
        }else if(kind=="people"){
            setloading(false);
            fetch(`https://api.themoviedb.org/3/person/${id}?api_key=f04abd28a278b378a10634e8da13acc0&language=en-US`).then(function(res)  {
              return res.json();
            }).then(data => {
                console.log(data)
              setdata(data.results);
              setimage(data.profile_path)
              settitle(data.name);
              settag(data.birthday)
              setvote(data.biography)
              setvotecount(data.popularity)
              setdate(data.place_of_birth);
             
             
              console.log("eners",geners)
              setloading(false);
              
    
            
             
            });
        }else{
        setloading(false);
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=f04abd28a278b378a10634e8da13acc0&language=en-US`).then(function(res)  {
          return res.json();
        }).then(data => {
          setdata(data.results);
          setimage(data.poster_path)
          settitle(data.title);
          settag(data.tagline)
          setvote(data.vote_average)
          setvotecount(data.vote_count)
          setdate(data.release_date);
          setgeners(data.genres)
         
          console.log("eners",geners)
          setloading(false);
          

        
         
        });

    }
        
    },[]);
   
    if(loading){
        return <div>Loading...</div>
    }      
    if(kind === "people"){
        return(
            <>
            <Nav />
         <section className="two" style={{color:"white"}}>
   <div className="first" style={{width:"30%"}}>
           <img src={`https://image.tmdb.org/t/p/w500/${image
   }`} alt="backdrop"/>
   </div>
   <div className="seconed" style={{width:"70%"}}>
       <div>
     <h2 className="gupter-bold" style={{    "fontSize": 46}}> {title}</h2> 
     <p> <span>birthday : </span> {tag}</p>
     <p> <span>place of birth : </span> {date}</p>
   {genersdata}
     <span className="gupter-regular span">Popularity : {votecount}</span>

     <p>{vote} .....</p>

   </div>
   </div>
           </section>
           </>
        )
    }else{


    genersdata = geners.map(ele => {
            
        return(
            <div key={ele.id} className="gupter-regular s2">
             <span className="s2">{ele.name}</span> 
              </div>
        )
  })
    return (
        <>
         <Nav />
      <section className="two" style={{color:"white"}}>
<div className="first">
        <img src={`https://image.tmdb.org/t/p/w500/${image
}`} alt="backdrop"/>
</div>
<div className="seconed">
    <div>
  <h2 className="gupter-bold" style={{    "fontSize": 46}}> {title}</h2> 
  <p>{tag}</p>

{genersdata}
  <span className="gupter-regular span">vote : {vote}</span>
  <span className="gupter-regular span">vote count : {votecount}</span>
  <span className="gupter-regular span"> Release date : {date}</span>
</div>
</div>
        </section>
        </>

    );
    }
}
export default SingleEle;