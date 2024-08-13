import { useEffect } from "react"
import { checkUserCred,checkIfEmailExcist } from "../functions/Func";
import { Link } from "react-router-dom";
const Single  = ({id,shown,poster,title,rating,kind})=> {
    
   
    return(
        <>
        <Link to={`/single/${id}/${kind}`}>
    <figure data-id={`${id}`} className="figure">
        <img src={`${poster}`} alt={`${title}`}/>
        <h6>{title}</h6>
        {shown === "true" && <span>{rating}</span>}
    </figure>

    </Link>
        </>
        
    )
} 
export default Single;