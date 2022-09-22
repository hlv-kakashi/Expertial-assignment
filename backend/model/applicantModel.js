const {Schema,model} = require("mongoose")

let applicantSchema = new Schema({
    name: { type: String, required:  true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: Number,
    ip: String,
})



let applicant = model("applicant",applicantSchema)

module.exports = applicant;