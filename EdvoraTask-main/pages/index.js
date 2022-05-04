import { NavBar } from "../components/Navbar/Navbar";
import { Filters } from "../components/Filters/Filters";
import { Rides } from "../components/Rides/Rides";



export default function Home() {
  // const [ user, setUser ] = useState({});

  //   useEffect(()=>{
  //      loadData();
  //   },[]);
  //   const loadData =async()=>{
  //      await fetch('https://assessment.api.vweb.app/user')
  //       .then( response => response.json() )
  //       .then(res => {
          
  //         setUser( res.user );
  //         console.log(user);
  //     });     
          
      
        
  //   } 
   
   return (
   <>
    
   {/* <ApiProvider /> */}
   <NavBar /> 
   <Filters/> 
   <Rides />
   </>
  )
}
