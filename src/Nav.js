import { BrowserRouter, Routes, Route,Link }  from 'react-router-dom';

function Nav() {
   
    return (
       <>
       <Link to='/'>home</Link>
       <Link to={`/hi/3`}>com</Link>
       </>
    );
}
export default Nav;