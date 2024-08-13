import { useState } from 'react';
function CH() {
const [value,setvalue] = useState("off")

const  Toggle = () =>{
    setvalue(value=="off"?"on":"off")
}
return [value,Toggle];
}

export default CH;