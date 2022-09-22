import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
useEffect(() => {
if(JSON.parse(localStorage.getItem("profile"))?.id){
  navigate("/jobs");
}else{
    navigate("/login");
}
})

return
}

export default Home;