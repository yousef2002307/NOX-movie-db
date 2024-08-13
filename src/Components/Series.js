import Nav from "./Nav"
import { useEffect } from "react"
import React from 'react'
import Single from "./Single";
function Series() {
    const [data,setdata] = React.useState([]);
    const [loading,setloading] = React.useState(true)
    useEffect(() => {

        setloading(false);
        fetch("https://api.themoviedb.org/3/trending/tv/week?api_key=3dbf1b3702492e27db2c07eaadcbae76").then(function(res)  {
            return res.json();
          }).then(data => {
            setdata(data.results);
          });
        
    },[]);      
    let functvdata = data.map(ele => {
       
        return(
          <React.Fragment key={ele.id}>
           <div>
                <Single id={ele.id} shown="true" poster={"https://image.tmdb.org/t/p/w500/"+ele.poster_path} title={ele.title} rating={parseInt(ele.vote_average).toFixed(1)} kind="show"/>
              </div>
          </React.Fragment>
        )
      
      });
      if (loading) {
        return <div>Loading...</div>;
      }
    return (
        <>
        <Nav act="shows"/>
        <section className='movies ' style={{justifyContent : "center"}}> 
      <div className='one'>
        <h5>Trending Movies
        To Watch Right Now</h5>
        <span className='sub'>
        Most watched Movies by Days
        </span>
      </div>
   
       {functvdata}
      </section>


        </>
    )
}

export default Series;