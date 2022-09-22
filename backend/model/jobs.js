
const {Schema,model} = require("mongoose")

let jobsSchema = new Schema({
   role:String,
   company_name:String,
   description:String,
   experience:Number,
   minimum_qualification:String,
   applied:String
})



let job = model("job",jobsSchema)

module.exports = job;