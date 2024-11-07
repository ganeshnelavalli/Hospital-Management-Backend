const mongoose = require("mongoose")
main().catch(err => console.log(err))

async function main(){
    await mongoose.connect('mongodb://localhost:27017/Hospital_db')
}

const my_Schema = mongoose.Schema({
    src:String,
    name:String,
    speciality:String,
    stars:Number
})

const my_model = mongoose.model("doctors_collection", my_Schema)

// my_model.insertMany([{
//     src:"./assets/d1.jpg",
//     name: "John Doe",
//     speciality: "Cardiologist",
//     stars: 4.8
// },{
//     src:"./assets/d2.jpg",
//     name: "Jane Smith",
//     speciality: "Dermatologist",
//     stars: 4.6
// },{
//     src:"./assets/d3.jpg",
//     name: "Sarah Lee",
//     speciality: "Pediatrician",
//     stars: 4.7
// },{
//     src:"./assets/d4.jpg",
//     name: "Mike Johnson",
//     speciality:"Neurologist",
//     stars:4.9
// }])

const appointment_schema = mongoose.Schema({
    patientName:String,
    patientEmail:String,
    doctor:String,
    appointmentDate:Date,
})

const appointments = mongoose.model("appointments", appointment_schema)

const contact_schema = mongoose.Schema({
    name:String,
    email:String,
    message:String
})

const contact = mongoose.model("contacts", contact_schema)
module.exports = {my_model, appointments, contact}