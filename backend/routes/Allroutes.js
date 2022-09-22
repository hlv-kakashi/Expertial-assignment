const {Router} = require("express")
const {applyJobs,getAllList,logIn,postJobs,signIn,singleJob,appliedJobs,searchJobs} = require("../controller/AllController");
const route = Router();

route.post("/login",logIn);
route.post("/signup",signIn);
route.get("/alljobs", getAllList);
route.get("/jobs/:id", singleJob);
route.post("/apply/:id", applyJobs);
route.get("/apply",appliedJobs)
route.get("/search/:id",searchJobs)



module.exports = route;