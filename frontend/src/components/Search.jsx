import { TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Search = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if(!JSON.parse(localStorage.getItem("profile"))?.id){
        navigate("/login");
      }
  },[])
  const handleChange = (e) => {
    let search = e.target.value;
    axios
      .get(`https://education-board-app.herokuapp.com/search/${search}`)
      .then((res) => setData(res.data));
  };
  return (
    <div style={{ marginTop: "50px" }}>
      <TextField
        onChange={handleChange}
        color="secondary"
        style={{ width: "30%" }}
        label="SEARCH FOR ROLES"
      />
      <div className="searchresults">
        {data.map((e, i) => (
          <Link to={`/jobs/${e._id}`}>
            <Typography style={{ marginTop: "10px" }} variant="h5">
              {e.role}
            </Typography>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
