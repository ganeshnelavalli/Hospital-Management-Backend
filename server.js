const e = require("express")
const { my_model, appointments, contact } = require("./mongo")
const path = require("path");
const { log } = require("console");
let server = e()
let port = process.env.PORT||3535
server.use(e.static(path.join(__dirname, 'public')));
server.use(e.urlencoded({ extended: true }));
server.listen(port, ()=>{
    console.log("Server listening at 3535");
})
server.get("/", async(req, res)=>{
    let doctors = await(my_model.find())
    const appointmentBooked = req.query.appointmentBooked === 'true';
    let appointment_array = await(appointments.find())
    res.render("Home.ejs", {doctors, appointmentBooked, appointment_array})
    // res.send("Server is live!")
})
server.get("/find-doctors", async(req, res)=>{
    let doctors = await(my_model.find())
    res.render("Doctors.ejs", {doctors})
})
server.get("/appointment", async(req, res)=>{
    let doctors = await(my_model.find())
    let selected_doctor = null
    let appointment_array = await(appointments.find())
    res.render("Appointment.ejs", {doctors, selected_doctor, appointment_array})
})
server.get("/appointment/:doctor_id", async(req, res)=>{
    const doctorId = req.params.doctor_id
    let selected_doctor = await my_model.findById(doctorId)
    console.log(selected_doctor)
    if(!selected_doctor){
        res.status(404).send("Doctor Not Found!")
    }
    let doctors = await(my_model.find())
    let appointment_array = await(appointments.find())
    res.render("Appointment.ejs", {doctors, selected_doctor , appointment_array})
})
server.get("/contact", (req, res)=>{
    const messageSent = req.query.messageSent === 'true';
    res.render("contact-us.ejs", {messageSent})
})
server.post('/contact-form', async(req, res) => {
    const { name, email, message } = req.body;
    try{
        const a = new contact({name, email, message})
        await(a.save())
        res.redirect('/contact?messageSent=true');
    }
    catch (error){
        console.error("Error sending Message", error)
        res.status(500).send("Error sending message")
    }})
server.post('/submit-appointment', async(req, res) => {
    const { patientName, patientEmail, doctor, appointmentDate} = req.body;
    try{
        const i = new appointments({patientName, patientEmail, doctor, appointmentDate})
        await(i.save())
        res.redirect('/?appointmentBooked=true');
    }catch (error) {
        console.error("Error Booking Appointment", error)
        res.status(500).send("Error Booking Appointment")
    }});
server.set("view engine", "ejs")