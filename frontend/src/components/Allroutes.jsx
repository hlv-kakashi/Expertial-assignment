import {Routes,Route} from "react-router-dom";
import Alljobs from "./Alljobs";
import Applied from "./Applied";
import Apply from "./Apply";
import Auth from "./Auth";
import Home from "./Home";
import Search from "./Search";
import SingleJob from "./SingleJob";

const Allroutes = () => {



    return(
         <Routes>
            <Route path="/jobs" element={<Alljobs/>} />
            <Route path="/login" element={<Auth/>}/>
            <Route path="/jobs/:id" element={<SingleJob/>}/>
            <Route path="/apply/:id" element={<Apply/>}/>
            <Route path="/applied" element={<Applied/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/" element={<Home/>}/>
         </Routes>
    )

}

export default Allroutes;