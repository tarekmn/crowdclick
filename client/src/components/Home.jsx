import Section from "./Friends"
import { useEffect } from "react"
import Contact from "./Login"


const Home = (props) => {


  if (!window.location.href.includes("?")) {
   window.location.href= window.location.href+"?tab=home"
  } 

  useEffect( () => {
  } , [props.currSection])

  return (
    <>
      
    

    <h1>Home Page</h1>

        


    </>
  )
}


export default Home