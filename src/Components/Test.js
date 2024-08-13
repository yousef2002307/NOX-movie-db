import { useEffect } from "react"
import { checkUserCred,checkIfEmailExcist } from "../functions/Func";
const Test  = ()=> {
    
    useEffect(() => {
        let doesEmailExcist = true; 
        checkIfEmailExcist("mmnwat6@gmail.com").then(val=>{
        
        doesEmailExcist = val
       });
       console.log("does",doesEmailExcist)
       
    })
    return(
        <>
        test
        </>
    )
} 
export default Test;