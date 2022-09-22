const user = require("../model/applicantModel");
const job = require("../model/jobs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


module.exports.getAllList = async(req,res) => {
try {
    const page = req.query.page;
    const limit = req.query.limit;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    const allJobs = await job.find();
    let result = allJobs.slice(startIndex,endIndex);
    res.json(result);
} catch (error) {
    res.send(error);
}
}

module.exports.postJobs = async(req,res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports.applyJobs = async(req,res) => {
  const {id} = req.params;
  
    try {
        const jobs = await job.findByIdAndUpdate(id,{
          $set:{applied:"true"},
        });
        res.send("ok");

    } catch (error) {
        res.send(error);
    }
}

module.exports.appliedJobs = async(req,res) => {
  try {
    const as = await job.find({applied:true})
    res.json(as);
  } catch (error) {
    // res.send(error);
  }
}

module.exports.searchJobs = async(req,res) => {
  try {
    const {id} = req.params;
    const result = await job.find({role:{$regex:id,$options:"i"}})
    res.json(result);
  } catch (error) {
    res.send(error);
  }
}

module.exports.singleJob = async(req,res) =>{
  const {id} = req.params;
    try {    
        const jobs = await job.findById(id);

        res.send(jobs);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports.signIn = async(req,res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {
      const existingUser = await user.findOne({ email });
  
      if (existingUser) {
        return res.json({ message: "user already exist" });
      }
  
      if (password !== confirmPassword) {
        return res.json({ message: "Password didn't match" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await user.create({
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
        ip: req.ip,
      });
  
      const token = jwt.sign({ email: result.email, id: result._id }, "test", {
        expiresIn: "1h",
      });
  
      res.json({ result, token, message: "User Created Successfully" });
    } catch (error) {
      res.status(500).json({ message: error});
    }
}

module.exports.logIn = async(req,res) => {
    const { email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });

    if (!existingUser.email) {
      return res.json({ message: "user doesnot exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ result: existingUser, token, message: "login Successful" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
}