import axios from "axios";
export const selectsong = (song) => {
    return async function(dispatch,getstate){
        let response = await axios.get('http://localhost:3001/items')
        console.log(response,getstate())
        dispatch({type:"song selected",payload:response.data});
    }
    
}

export const deletesong = ($id) => {
    return async function(dispatch,getstate){
        let response = await axios.delete(`http://localhost:3001/items/${$id}`)
        console.log(response,getstate())
        dispatch({type:"delete",payload:$id});
    }
    
}


export const insertsong = (song) => {
    return async function(dispatch,getstate){
   const addeditem = axios.post('http://localhost:3001/items',song)
   console.log(addeditem,getstate())
   dispatch({type:"ins",payload:song});
    }

}


export const editsong = (song,id) => {
    return async function(dispatch,getstate){
   const addeditem = axios.patch(`http://localhost:3001/items/${id}`,song)
   console.log("saasas",addeditem,getstate())
   dispatch({type:"edit",payload:{song,id}});
    }

}
export const newins = () => {
    return {
        type :"newstate",
       
    }
}
