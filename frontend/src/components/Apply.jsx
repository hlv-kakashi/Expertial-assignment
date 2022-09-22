import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Apply = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      axios
        .get(`https://education-board-app.herokuapp.com/jobs/${id}`)
        .then((res) => setData(res.data));
    }, []);
    const handleChange = () => {

    }
    const handleSubmit = () => {
        axios.post(`https://education-board-app.herokuapp.com/apply/${id}`).then(() => {
            alert("applied Successfully");
        }).then(() => {
               navigate("/applied")
        })
    }
  return (
    <div>
      <form action="">      
        <Stack width={400} margin="auto" style={{marginTop:"20px"}} spacing={3} direction="column">
        <Typography variant="h2">{data.company_name} hiring</Typography>
        <Typography  variant="h4">Enter your Details</Typography>
        <TextField
                    color="secondary"
                    variant="standard"
                    type="text"
                    name="firstName"
                    label="Enter your first Name"
                    onChange={handleChange}
                    
                  />
                   <TextField
                    color="secondary"
                    variant="standard"
                    type="text"
                    name="firstName"
                    label="Enter your last Name"
                    onChange={handleChange}
                    
                  />
                   <TextField
                    color="secondary"
                    variant="standard"
                    type="number"
                    name="firstName"
                    label="Enter your age"
                    onChange={handleChange}
                    
                  />
                    <TextField
                    color="secondary"
                    variant="standard"
                    type="number"
                    name="firstName"
                    label="Enter your Highest Qualification"
                    onChange={handleChange}
                      
                  />
                    <TextField
                    color="secondary"
                    variant="standard"
                    type="number"
                    name="firstName"
                    label="Working experience in years"
                    onChange={handleChange}
                    
                  />
                    <TextField
                    color="secondary"x
                    type="file"
                    

                  />
                  <Typography>Upload your resume</Typography>
                  <Button onClick={handleSubmit} color="secondary" variant="contained">Submit</Button>
        </Stack>
      </form>
    </div>
  );
};

export default Apply;
