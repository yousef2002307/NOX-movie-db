import { useEffect } from "react"

const LogOut = () => {
useEffect(() => {
    localStorage.clear();
    window.location.href = "/";
})
return(
    <>
    </>
)
}
export default LogOut