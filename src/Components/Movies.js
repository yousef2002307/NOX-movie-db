import Nav from "./Nav"
import { useEffect } from "react"
import React from 'react'
import Single from "./Single";
function Movies() {
    const [data,setdata] = React.useState([]);
    const [loading,setloading] = React.useState(true)
    useEffect(() => {

        setloading(false);
        fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=3dbf1b3702492e27db2c07eaadcbae76").then(function(res)  {
          return res.json();
        }).then(data => {
          setdata(data.results);
        });
    },[]);      
    let funcdata = data.map(ele => {
       
       
        return(
          <React.Fragment key={ele.id}>
           <div>
                <Single id={ele.id} shown="true" poster={"https://image.tmdb.org/t/p/w500/"+ele.poster_path} title={ele.title} rating={parseInt(ele.vote_average).toFixed(1)} kind="movie"/>
              </div>
          </React.Fragment>
        )
      
      });
      if (loading) {
        return <div>Loading...</div>;
      }
    return (
        <>
        <Nav act="movies"/>
        <section className='movies ' style={{justifyContent : "center"}}> 
      <div className='one'>
        <h5>Trending Movies
        To Watch Right Now</h5>
        <span className='sub'>
        Most watched Movies by Days
        </span>
      </div>
   
       {funcdata}
      </section>


        </>
    )
}

export default Movies