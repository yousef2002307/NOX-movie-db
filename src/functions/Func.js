import axios from "axios";
export function checkLogin(){
  const isLogged = localStorage.getItem("is_logged");
  const id = localStorage.getItem("id");
  console.log(isLogged, id);
  return isLogged === "true" && id !== null;
}

export async function checkUserCred($email,$password){
 
const data = await axios.get('http://localhost:3001/users');
console.log(data);
let items = data.data;
console.log(items)
for(let i = 0 ;  i < items.length ; i++){
const {id,email,password} = items[i];
if(email === $email && password === $password){
  localStorage.setItem("is_logged",true);
  localStorage.setItem("id",id);
  
  return true;
}
}
return false;
}



export async function checkIfEmailExcist($email){
 
  const data = await axios.get('http://localhost:3001/users');
  console.log(data);
  let items = data.data;
  console.log(items,$email)
  for(let i = 0 ;  i < items.length ; i++){
  const {id,email,password} = items[i];
  if(email === $email ){
  console.log(" checkIfEmailExcist",$email)
    return true;
  }
  }
  return false;
  }