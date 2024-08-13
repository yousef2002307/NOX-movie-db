import _ from "loadsh";
export const itemsred = (state = [],action) => {
   if(action.type === 'song selected'){
    return [...action.payload]
   }
   if(action.type === 'delete'){
      state = state.filter((obj) => obj.id !== action.payload)
      console.log(state);
      return state;
     }
   if(action.type === 'ins'){
      state = [...state,action.payload];
      console.log(state);
      return state;
     }
     if(action.type === 'edit'){
     return state.map(obj => {
       if(obj.id === action.payload.id){
         return { ...action.payload.song};

       }
       return obj;
     })
     }
     if(action.type === 'newstate'){
      return {address:"hala"}
     }
  
   return state
}