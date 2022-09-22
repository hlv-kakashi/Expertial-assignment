import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./style.css";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import {Link, useNavigate} from "react-router-dom"

const Alljobs = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if(!JSON.parse(localStorage.getItem("profile"))?.id){
        navigate("/login");
      }
    axios
      .get(`https://education-board-app.herokuapp.com/alljobs?page=${page}&limit=${limit}`)
      .then((res) => setData(res.data));
  }, [page]);
  console.log(page);
  const handleChange = (e,value) => {
    setPage(value);
  }
  const inside = () => {

  }
  return (
    <>
      <div style={{display:"flex",justifyContent:"center",marginTop:"50px",marginBottom:"20px "}}>
        <Stack spacing={2}>
          <Pagination page={page} onChange={handleChange} count={10} color="secondary" />
        </Stack>
      </div>
      {data.map((e, i) => (
        <Link to={`/jobs/${e._id}`} key={e._id} style={{textDecoration:"none",color:"rgb(156,39,176)",width:"40%"}}>
        <div className="outerDiv">
          <h2>{e.company_name}</h2>
          <div
            style={{
              display: "flex",
              gap: "100px",
              justifyContent: "space-between",
              paddingLeft: "50px",
              paddingRight: "50px",
            }}
          >
            <Typography variant={"h5"}>Role:</Typography >
            <Typography variant={"h5"}>{e.role}</Typography >
          </div>
          <div
            style={{
              display: "flex",
              gap: "100px",
              justifyContent: "space-between",
              paddingLeft: "50px",
              paddingRight: "50px",
            }}
          >
            <Typography variant={"h5"}>Minimum experience:</Typography >
            <Typography variant={"h5"}>{e.experience} years</Typography >
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "50px",
              paddingRight: "50px",
            }}
          >
            <Typography variant={"h5"}>Department:</Typography >
            <Typography variant={"h5"}>{e.department}</Typography >
          </div>
        </div>
        </Link>
      ))}
    </>
  );
};

export default Alljobs;
