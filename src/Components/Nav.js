import { useEffect } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
  } from '@chakra-ui/react'
  import { Link } from 'react-router-dom';
  import { checkLogin } from '../functions/Func';
  import { checkUserCred } from "../functions/Func";
function Nav({clas,act}){
  useEffect(() => {
    if(checkLogin()){
      document.documentElement.style.setProperty("--chakra-colors-chakra-body-bg", "#131722");
    }
  })
  if(!checkLogin()  ){
    return(
        <>
              <Breadcrumb>
              <h3>Nox</h3>
             

  <BreadcrumbItem {...(clas === "register" && { isCurrentPage: true })}>
    <BreadcrumbLink href='#'><Link to="/register"> register </Link></BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem {...(clas === "login" && { isCurrentPage: true })}>
    <BreadcrumbLink href='#'> <Link to="/login">  login  </Link></BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
</>
    )
  }else{
    return(
    <>
    <Breadcrumb style={{backgroundColor:"transparent",color:"white"}}>
    <h3>Nox</h3>
    <BreadcrumbItem className={act == 'home' ? "act": ""} style={{    fontSize: 22,
    fontWeight: 400,
    textTransform: "capitalize"}} {...(clas === "home" && { isCurrentPage: true })}>
<BreadcrumbLink href='#'><Link to="/">  home  </Link></BreadcrumbLink>
</BreadcrumbItem>

<BreadcrumbItem className={act == 'movies' ? "act": ""} style={{    fontSize: 22,
    fontWeight: 400,
    textTransform: "capitalize"}} {...(clas === "register" && { isCurrentPage: true })}>
<BreadcrumbLink href='#'><Link to="/movies"> movies</Link></BreadcrumbLink>
</BreadcrumbItem>

<BreadcrumbItem className={act == 'shows' ? "act": ""} style={{    fontSize: 22,
    fontWeight: 400,
    textTransform: "capitalize"}} {...(clas === "login" && { isCurrentPage: true })}>
<BreadcrumbLink href='#'> <Link to="/shows">  tv-shows  </Link></BreadcrumbLink>
</BreadcrumbItem>
<BreadcrumbItem className={act == 'people' ? "act": ""}  style={{    fontSize: 22,
    fontWeight: 400,
    textTransform: "capitalize"}} {...(clas === "login" && { isCurrentPage: true })}>
<BreadcrumbLink href='#'> <Link to="/people">  people  </Link></BreadcrumbLink>
</BreadcrumbItem>

<BreadcrumbItem  style={{    fontSize: 22,
    fontWeight: 400,
    textTransform: "capitalize"}} {...(clas === "login" && { isCurrentPage: true })}>
<BreadcrumbLink href='#'> <Link to="/logout">  logout  </Link></BreadcrumbLink>
</BreadcrumbItem>
</Breadcrumb>
</>
    )
  }
}
export default Nav;