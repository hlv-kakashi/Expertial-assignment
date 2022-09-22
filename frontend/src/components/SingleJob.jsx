import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleJob = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://education-board-app.herokuapp.com/jobs/${id}`)
      .then((res) => setData(res.data));
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <div className="finalDiv">
        <Typography variant="h3">{data.company_name}</Typography>
        <Typography variant="subtitle1">{data.description}</Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "50px",
            paddingRight: "50px",
            marginTop: "40px",
          }}
        >
          <Typography variant={"h5"}>Role:</Typography>
          <Typography variant={"h5"}>{data.role}</Typography>
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
          <Typography variant={"h5"}>Department:</Typography>
          <Typography variant={"h5"}>{data.department}</Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "50px",
            paddingRight: "50px",
          }}
        >
          <Typography variant={"h5"}>experience required:</Typography>
          <Typography variant={"h5"}>{data.experience}+ years</Typography>
        </div>
        {data.applied == "true" ? (
          <Button style={{ marginTop: "50px" }}  variant="contained" disabled={true}>Already Applied!!!</Button>
        ) : (
          <Button
            onClick={() => navigate(`/apply/${data._id}`)}
            style={{ marginTop: "50px" }}
            color="secondary"
            variant="contained"
          >
            Apply Now
          </Button>
        )}
      </div>
    </>
  );
};

export default SingleJob;
