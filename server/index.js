const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb')
const { exec } = require('child_process')
const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Models
const User = require('./models/user')
const AdminProfile = require('./models/admin_profile')
const DoctorProfile = require('./models/doctor_profile')
const PatientProfile = require('./models/patient_profile')
const LabProfile = require('./models/lab_profile')
const PharmacistProfile = require('./models/pharmacist_profile')
const AppointmentRequest = require('./models/appointment_request')
const TestRequest = require('./models/test_request')
const AppointmentBooked = require('./models/appointment_booked')
const TestBooked = require('./models/test_booked')
const ChatMessage = require('./models/chat_messages')
const Medicine = require('./models/medicine')
const ScrappedMedicine = require('./models/scrapped_medicine')
const Notification = require('./models/notification.js')

app.use(cors())
app.use(express.json())

app.use(bodyParser.json({ limit: '600mb' }))
app.use(bodyParser.urlencoded({ limit: '600mb', extended: true }))

main().catch(err => console.log(err))

async function main() {
  // Note: use 127.0.0.1 instead of localhost
  await mongoose.connect('mongodb://127.0.0.1:27017/clinical-medics', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((error) => {
      console.log('Error connecting to MongoDB:', error)
    })
}

app.post('/api/register', async (req, res) => {

  try {
    const decryptedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: decryptedPassword,
      profession: req.body.profession,
    })

    if (req.body.profession == 'd') {
      await DoctorProfile.create({
        _id: user._id,
        profileImage: {
          data: null,
          contentType: null
        },
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        profession: req.body.profession,
        address: null,
        officeAddress: null,
        degree: null,
        specialization: null,
        appointmentTime: null,
        fee: null
      })
    }
    else if (req.body.profession == 'u') {
      await PatientProfile.create({
        _id: user._id,
        profileImage: {
          data: null,
          contentType: null
        },
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        profession: req.body.profession,
        address: null,
        DOB: null,
        gender: null,
        weight: null,
        height: null
      })
    }
    else if (req.body.profession == 'l') {
      await LabProfile.create({
        _id: user._id,
        profileImage: {
          data: null,
          contentType: null
        },
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        profession: req.body.profession,
        address: null
      })
    }
    else if (req.body.profession == 'p') {
      await PharmacistProfile.create({
        _id: user._id,
        profileImage: {
          data: null,
          contentType: null
        },
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        profession: req.body.profession,
        address: null,
        type: 'l'
      })
    }

    res.json({ status: 'ok' })
  } catch (err) {
    console.log(err) // To check errors
    res.json({ status: 'error', error: 'Duplicate Email' })
  }
})

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) { return { status: 'ok', error: 'Invalid User' } }

  const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      'secret123'
    )
    return res.json({ status: 'ok', user: token })
  } else {
    return res.json({ status: 'error', user: false })
  }
})

app.get('/api/dashboard', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const user = await User.findOne({ _id: _id })

    return res.json({ status: 'ok', _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, profession: user.profession })
  } catch (error) {
    res.json({ status: 'error', error: ' invalid token in dashboard' })
  }
})

app.get('/api/display_users', async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: '649547ab0b99abb83b6f3dc9' } })

    return res.json({ status: 'ok', users: users })
  } catch (error) {
    console.error('Error retrieving documents:', error)
    res.json({ status: 'error', error: 'Failed to retrieve user profiles' })
  }
})

app.get('/api/display_doctor', async (req, res) => {
  try {
    const doctors = await DoctorProfile.find({})

    return res.json({ status: 'ok', doctors: doctors })
  } catch (error) {
    console.error('Error retrieving documents:', error)
    res.json({ status: 'error', error: 'Failed to retrieve doctor profiles' })
  }
})

// To do
// app.get('/api/search_doctor', async (req, res) => {
//   try {
//     const search = sanitizeInput(req.query.search) || ""
//     const page = parseInt(req.query.page) || 1
//     const limit = 50

//     const skip = (page - 1) * limit

//     let query = {}

//     if (search) {
//       query.firstName = { $regex: search, $options: "i" }
//     }

//     const doctors = await DoctorProfile.find(query)
//       .skip(skip)
//       .limit(limit)
//       .exec()

//     return res.json({ status: 'ok', doctors: doctors })
//   } catch (error) {
//     console.error('Error retrieving documents:', error)
//     res.json({ status: 'error', error: 'Failed to retrieve doctor profiles' })
//   }
// })

// function sanitizeInput(input) {
//   const sanitizedInput = String(input).replace(/[!@#$%^&*()\/.,\[\]{}|]/g, '');

//   return sanitizedInput
// }

app.get('/api/display_lab', async (req, res) => {
  try {
    const labs = await LabProfile.find({})

    return res.json({ status: 'ok', labs: labs })
  } catch (error) {
    console.error('Error retrieving documents:', error)
    res.json({ status: 'error', error: 'Failed to retrieve doctor profiles' })
  }
})

app.get('/api/display_patient', async (req, res) => {
  try {
    const patients = await PatientProfile.find({})

    return res.json({ status: 'ok', patients: patients })
  } catch (error) {
    console.error('Error retrieving documents:', error)
    res.json({ status: 'error', error: 'Failed to retrieve doctor profiles' })
  }
})

app.get('/api/display_pharmacist', async (req, res) => {
  try {
    const pharmacists = await PharmacistProfile.find({})

    return res.json({ status: 'ok', pharmacists: pharmacists })
  } catch (error) {
    console.error('Error retrieving documents:', error)
    res.json({ status: 'error', error: 'Failed to retrieve doctor profiles' })
  }
})

app.get('/api/admin_profile', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const profile = await AdminProfile.findById(_id)

    return res.json({ status: 'ok', _id: profile._id, profileImage: profile.profileImage, firstName: profile.firstName, lastName: profile.lastName, email: profile.email })
  } catch (error) {
    res.json({ status: 'error', error: ' invalid token in get a profile' })
  }
})

app.get('/api/doctor_profile', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const profile = await DoctorProfile.findById(_id)

    return res.json({ status: 'ok', _id: profile._id, profileImage: profile.profileImage, firstName: profile.firstName, lastName: profile.lastName, email: profile.email, profession: profile.profession, address: profile.address, officeAddress: profile.officeAddress, degree: profile.degree, specialization: profile.specialization, appointmentTime: profile.appointmentTime, fee: profile.fee })
  } catch (error) {
    res.json({ status: 'error', error: ' invalid token in get d profile' })
  }
})

app.get('/api/p_doctor_profile', async (req, res) => {
  const doctorID = req.query.id;

  try {
    const profile = await DoctorProfile.findById(doctorID)

    return res.json({ status: 'ok', _id: profile._id, profileImage: profile.profileImage, firstName: profile.firstName, lastName: profile.lastName, email: profile.email, profession: profile.profession, address: profile.address, officeAddress: profile.officeAddress, degree: profile.degree, specialization: profile.specialization, appointmentTime: profile.appointmentTime, fee: profile.fee })
  } catch (error) {
    res.json({ status: 'error', error: ' invalid token in get d profile' })
  }
})

app.post('/api/doctor_profile', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id

    const profile = await DoctorProfile.findByIdAndUpdate(
      _id,
      {
        profileImage: req.body.profileImage,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        profession: req.body.profession,
        address: req.body.address,
        officeAddress: req.body.officeAddress,
        degree: req.body.degree,
        specialization: req.body.specialization,
        appointmentTime: req.body.appointmentTime,
        fee: req.body.fee
      },
      { new: true }
    )

    return res.json({ status: 'ok', _id: profile._id, firstName: profile.firstName, lastName: profile.lastName, email: profile.email })
  } catch (error) {
    res.json({ status: 'error', error: ' invalid token in post d profile' })
  }
})

app.get('/api/patient_profile', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const profile = await PatientProfile.findById(_id)

    return res.json({ status: 'ok', _id: profile._id, profileImage: profile.profileImage, firstName: profile.firstName, lastName: profile.lastName, email: profile.email, profession: profile.profession, address: profile.address, DOB: profile.DOB, gender: profile.gender, weight: profile.weight, height: profile.height })
  } catch (error) {
    res.json({ status: 'error', error: ' invalid token in p profile' })
  }
})

app.get('/api/d_patient_profile', async (req, res) => {
  const patientID = req.query.id;

  try {
    const profile = await PatientProfile.findById(patientID)

    return res.json({ status: 'ok', _id: profile._id, profileImage: profile.profileImage, firstName: profile.firstName, lastName: profile.lastName, email: profile.email, profession: profile.profession, address: profile.address, DOB: profile.DOB, gender: profile.gender, weight: profile.weight, height: profile.height })
  } catch (error) {
    res.json({ status: 'error', error: ' invalid token in p profile' })
  }
})

app.post('/api/patient_profile', async (req, res) => {
  const token = req.headers['x-access-token']
  const dob = req.body.DOB
  const dateOnly = dob.toString().split('T')[0]

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const profile = await PatientProfile.findByIdAndUpdate(
      _id,
      {
        profileImage: req.body.profileImage,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        DOB: dateOnly,
        gender: req.body.gender,
        weight: req.body.weight,
        height: req.body.height
      },
      { new: true }
    )

    return res.json({ status: 'ok', _id: profile._id, firstName: profile.firstName, lastName: profile.lastName, email: profile.email })
  } catch (error) {
    res.json({ status: 'error', error: ' invalid token in p profile' })
  }
})

app.get('/api/lab_profile', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const profile = await LabProfile.findById(_id)

    return res.json({ status: 'ok', _id: profile._id, profileImage: profile.profileImage, firstName: profile.firstName, lastName: profile.lastName, email: profile.email, profession: profile.profession, address: profile.address, labTest: profile.labTest })
  } catch (error) {
    res.json({ status: 'error', error: ' invalid token in l profile' })
  }
})

app.post('/api/lab_profile', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const profile = await LabProfile.findByIdAndUpdate(
      _id,
      {
        profileImage: req.body.profileImage,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        labTest: req.body.labTest
      },
      { new: true }
    )

    return res.json({ status: 'ok', _id: profile._id, firstName: profile.firstName, lastName: profile.lastName, email: profile.email })
  } catch (error) {
    res.json({ status: 'error', error: ' invalid token in l profile' })
  }
})

app.get('/api/pharmacist_profile', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const profile = await PharmacistProfile.findById(_id)

    return res.json({ status: 'ok', _id: profile._id, profileImage: profile.profileImage, firstName: profile.firstName, lastName: profile.lastName, email: profile.email, profession: profile.profession })
  } catch (error) {
    res.json({ status: 'error', error: ' invalid token in p profile' })
  }
})

app.post('/api/pharmacist_profile', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const profile = await PharmacistProfile.findByIdAndUpdate(
      _id,
      {
        profileImage: req.body.profileImage,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      },
      { new: true }
    )

    return res.json({ status: 'ok', _id: profile._id, firstName: profile.firstName, lastName: profile.lastName, email: profile.email })
  } catch (error) {
    res.json({ status: 'error', error: ' invalid token in l profile' })
  }
})

app.get('/api/count_doctors', async (req, res) => {
  try {
    const count = await DoctorProfile.countDocuments()

    return res.json({ status: 'ok', count: count })
  } catch (error) {
    console.error('Error retrieving user count:', error)
    res.json({ status: 'error', error: 'Failed to retrieve user count' })
  }
})

app.get('/api/count_patients', async (req, res) => {
  try {
    const count = await PatientProfile.countDocuments()

    return res.json({ status: 'ok', count: count })
  } catch (error) {
    console.error('Error retrieving user count:', error)
    res.json({ status: 'error', error: 'Failed to retrieve user count' })
  }
})

app.get('/api/count_labs', async (req, res) => {
  try {
    const count = await LabProfile.countDocuments()

    return res.json({ status: 'ok', count: count })
  } catch (error) {
    console.error('Error retrieving user count:', error)
    res.json({ status: 'error', error: 'Failed to retrieve user count' })
  }
})

app.get('/api/count_pharmacists', async (req, res) => {
  try {
    const count = await PharmacistProfile.countDocuments()

    return res.json({ status: 'ok', count: count })
  } catch (error) {
    console.error('Error retrieving user count:', error)
    res.json({ status: 'error', error: 'Failed to retrieve user count' })
  }
})

app.post('/api/appointment_request', async (req, res) => {
  try {
    const request = await AppointmentRequest.create({
      doctorID: req.body.doctorID,
      doctorFirstName: req.body.doctorFirstName,
      doctorLastName: req.body.doctorLastName,
      patientID: req.body.patientID,
      patientFirstName: req.body.patientFirstName,
      patientLastName: req.body.patientLastName,
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
      appointmentType: req.body.appointmentType,
      approval: req.body.approval
    })

    return res.json({
      status: 'ok',
      doctorID: request.doctorID,
      patientID: request.patientID,
      appointmentDate: request.appointmentDate,
      appointmentTime: request.appointmentTime,
      approval: request.approval
    })
  } catch (err) {
    console.log(err); // To check errors
    res.json({ status: 'error', error: 'Post Appointment Request Error' })
  }
})

app.get('/api/p_appointment_request', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const request = await AppointmentRequest.find({ patientID: _id })

    return res.json({ status: 'ok', appointmentRequest: request })
  } catch (error) {
    console.error('Get Appointment Request Error:', error)
    return res.json({ status: 'error', error: 'Get Appointment Request Error' })
  }
})

app.get('/api/d_appointment_request', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const request = await AppointmentRequest.find({ doctorID: _id })

    return res.json({ status: 'ok', appointmentRequest: request })
  } catch (error) {
    res.json({ status: 'error', error: ' Get Appointment Request Error' })
  }
})

app.get('/api/d_book_appointment', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const booking = await AppointmentBooked.find({ doctorID: _id })

    return res.json({ status: 'ok', booking: booking })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: ' Get Appointment Booked Error' })
  }
})

app.get('/api/p_book_appointment', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const booking = await AppointmentBooked.find({ patientID: _id })

    return res.json({ status: 'ok', booking: booking })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: ' Get Appointment Booked Error' })
  }
})

app.post('/api/book_appointment', async (req, res) => {
  try {
    const {
      doctorID,
      doctorFirstName,
      doctorLastName,
      patientID,
      patientFirstName,
      patientLastName,
      appointmentDate,
      appointmentTime,
      appointmentType
    } = req.body

    if (
      !doctorID ||
      !doctorFirstName ||
      !doctorLastName ||
      !patientID ||
      !patientFirstName ||
      !patientLastName ||
      !appointmentDate ||
      !appointmentTime ||
      !appointmentType
    ) {
      return res.status(400).json({ status: 'error', error: ' Missing required fields in Appointment Booking' })
    } else {
      await AppointmentBooked.create(
        {
          doctorID: req.body.doctorID,
          doctorFirstName: req.body.doctorFirstName,
          doctorLastName: req.body.doctorLastName,
          patientID: req.body.patientID,
          patientFirstName: req.body.patientFirstName,
          patientLastName: req.body.patientLastName,
          appointmentDate: req.body.appointmentDate,
          appointmentTime: req.body.appointmentTime,
          appointmentType: req.body.appointmentType,
        }
      )

      return res.json({ status: 'ok' })
    }
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: ' Appointment Booked Error' })
  }
})

app.delete('/api/appointment_request', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    await AppointmentRequest.findOneAndDelete({ doctorID: _id })

    return res.json({ status: 'ok' })
  } catch (error) {
    res.json({ status: 'error', error: ' Appointment Request Removal Error' })
  }
})

app.post('/api/test_request', async (req, res) => {
  console.log(req)

  try {
    const {
      bioTechnicianID,
      bioTechnicianFirstName,
      bioTechnicianLastName,
      patientID,
      patientFirstName,
      patientLastName,
      testDate,
      testType,
      approval
    } = req.body

    if (
      !bioTechnicianID ||
      !bioTechnicianFirstName ||
      !bioTechnicianLastName |
      !patientID ||
      !patientFirstName ||
      !patientLastName ||
      !testDate ||
      !testType ||
      !approval
    ) {
      return res.status(400).json({ status: 'error', error: ' Missing required fields in Lab Test Booking' })
    } else {
      await TestRequest.create({
        bioTechnicianID: req.body.bioTechnicianID,
        bioTechnicianFirstName: req.body.bioTechnicianFirstName,
        bioTechnicianLastName: req.body.bioTechnicianLastName,
        patientID: req.body.patientID,
        patientFirstName: req.body.patientFirstName,
        patientLastName: req.body.patientLastName,
        testDate: req.body.testDate,
        testType: req.body.testType,
        approval: req.body.approval
      })

      return res.json({
        status: 'ok',
      })
    }
  } catch (err) {
    res.json({ status: 'error', error: 'Post Lab Test Request Error' })
  }
})

app.get('/api/p_test_request', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const testRequest = await TestRequest.find({ patientID: _id })

    return res.json({ status: 'ok', testRequest: testRequest })
  } catch (error) {
    console.error('Get Appointment Request Error:', error)
    return res.json({ status: 'error', error: 'Get Appointment Request Error' })
  }
})

app.get('/api/l_test_request', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const testRequest = await TestRequest.find({ bioTechnicianID: _id })

    return res.json({ status: 'ok', testRequest: testRequest })
  } catch (error) {
    console.error('Get Appointment Request Error:', error)
    return res.json({ status: 'error', error: 'Get Appointment Request Error' })
  }
})

app.get('/api/p_book_test', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const booking = await TestBooked.find({ patientID: _id })

    return res.json({ status: 'ok', booking: booking })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: ' Get Test Booked Error' })
  }
})

app.post('/api/book_test', async (req, res) => {
  try {
    const {
      bioTechnicianID,
      bioTechnicianFirstName,
      bioTechnicianLastName,
      patientID,
      patientFirstName,
      patientLastName,
      testDate,
      testType
    } = req.body

    if (
      !bioTechnicianID ||
      !bioTechnicianFirstName ||
      !bioTechnicianLastName ||
      !patientID ||
      !patientFirstName ||
      !patientLastName ||
      !testDate ||
      !testType
    ) {
      return res.status(400).json({ status: 'error', error: ' Missing required fields in Test Booking' })
    } else {
      await TestBooked.create(
        {
          bioTechnicianID: req.body.bioTechnicianID,
          bioTechnicianFirstName: req.body.bioTechnicianFirstName,
          bioTechnicianLastName: req.body.bioTechnicianLastName,
          patientID: req.body.patientID,
          patientFirstName: req.body.patientFirstName,
          patientLastName: req.body.patientLastName,
          testDate: req.body.testDate,
          testType: req.body.testType,
        }
      )

      return res.json({ status: 'ok' })
    }
  } catch (error) {
    res.json({ status: 'error', error: ' Test Booked Error' })
  }
})

app.delete('/api/test_request', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    await TestRequest.findOneAndDelete({ bioTechnicianID: _id })

    return res.json({ status: 'ok' })
  } catch (error) {
    res.json({ status: 'error', error: ' Lab Test Request Removal Error' })
  }
})

app.post('/api/message', async (req, res) => {
  try {
    const { user1, user2, message, sender } = req.body

    if (!user1 || !user2 || !message) {
      return res.status(400).json({ status: 'error', error: 'Missing required fields in Chat' })
    } else {
      const existingChat = await ChatMessage.findOneAndUpdate(
        { doctorID: user1 },
        { $push: { message: { text: message, sender: sender } } }
      )

      if (!existingChat) {
        await ChatMessage.create({
          doctorID: user1,
          patientID: user2,
          message: [{ text: message, sender: sender }]
        })
      }

      return res.json({ status: 'ok' })
    }
  } catch (error) {
    res.json({ status: 'error', error: 'Post Chat Error' })
  }
})

app.get('/api/d_message', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const chatMessage = await ChatMessage.find({ doctorID: _id })

    console.log(chatMessage)
    console.log(chatMessage[0].message)

    return res.json({ status: 'ok', messages: chatMessage })
  } catch (error) {
    res.json({ status: 'error', error: ' Get Chat Error' })
  }
})

app.get('/api/p_message', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const chatMessage = await ChatMessage.find({ patientID: _id })

    console.log(_id)
    console.log(chatMessage)
    console.log(chatMessage.message)

    return res.json({ status: 'ok', messages: chatMessage })
  } catch (error) {
    res.json({ status: 'error', error: ' Get Chat Error' })
  }
})

app.get('/api/medicine', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const medicines = await Medicine.findById(_id)

    return res.json({ status: 'ok', medicines: medicines.medicine })
  } catch (error) {
    console.error('Error retrieving documents:', error)
    res.json({ status: 'error', error: 'Failed to retrieve doctor profiles' })
  }
})

app.post('/api/medicine', async (req, res) => {
  try {
    const { pharID, name, quantity, price } = req.body

    if (!pharID || !name || !quantity || !price) {
      return res.status(400).json({ status: 'error', error: 'Missing required fields in Medicine' })
    } else {
      let medicineData = await Medicine.findById(pharID)

      if (!medicineData) {
        medicineData = new Medicine({
          _id: pharID,
          medicine: [{ name, quantity, price }],
        })
      } else {
        medicineData.medicine.push({ name, quantity, price })
      }

      await medicineData.save()

      return res.json({ status: 'ok' })
    }
  } catch (error) {
    res.json({ status: 'error', error: 'Post Chat Error' })
  }
})

app.delete('/api/medicine', async (req, res) => {
  const { _id, name } = req.body

  try {
    const result = await Medicine.findByIdAndUpdate(
      { _id: _id },
      { $pull: { medicine: { name: name } } },
    )

    if (result) {
      return res.json({ status: 'ok', message: 'Medicine removed' })
    } else {
      return res.status(404).json({ status: 'error', error: 'Medicine not found' })
    }
  } catch (error) {
    console.error('Error removing medicine:', error)
    return res.status(500).json({ status: 'error', error: 'Failed to remove medicine' })
  }
})

app.get('/api/count_medicine', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const count = await Medicine.findById({ _id: _id })

    return res.json({ status: 'ok', count: count.__v })
  } catch (error) {
    console.error('Error retrieving medicine count: ', error)
    res.json({ status: 'error', error: 'Failed to retrieve medicine count' })
  }
})

app.get('/run_scrapper', async (req, res) => {
  try {
    // Drop the collection
    const uri = 'mongodb://127.0.0.1:27017/' // MongoDB connection URI
    const client = new MongoClient(uri)
    await client.connect()
    const database = client.db('clinical-medics')
    const collectionName = 'ScrappedMedicine'

    const collections = await database.listCollections().toArray()

    const collectionExists = collections.some(
      (collection) => collection.name === collectionName
    )

    if (collectionExists) {
      await database.collection(collectionName).drop()
      console.log(`Collection ${collectionName} dropped successfully.`)
    } else {
      console.log(`Collection ${collectionName} does not exist.`)
    }

    // Execute the Python script
    exec('python data_scrawler/dataScrapper.py', (error, stdout, stderr) => {
      if (error) {
        console.error('Failed to execute Python script:', error)
        console.error('Error output:', stderr)
        res.status(500).json({ status: 'error', error: error.message })
      } else {
        console.log('Python script executed successfully!')
        res.json({ status: 'ok', message: 'Script executed successfully!', stdout })
      }
    })
  } catch (error) {
    console.error('Failed to drop collection:', error)
    res.status(500).json({ status: 'error', error: error.message })
  }
})

app.get('/api/display_scrapped_medicine', async (req, res) => {
  try {
    const medicines = await ScrappedMedicine.find({})

    return res.json({ status: 'ok', medicines: medicines })
  } catch (error) {
    console.error('Error retrieving documents:', error)
    res.json({ status: 'error', error: 'Failed to retrieve doctor profiles' })
  }
})

app.post('/api/notification', async (req, res) => {
  try {
    const { userID, message } = req.body

    console.log(req.body)

    if (!userID || !message) {
      return res.status(400).json({ status: 'error', error: 'Missing required fields in notification' })
    } else {
      await Notification.create({
        userID: req.body.userID,
        message: req.body.message,
      })

      return res.json({ status: 'ok' })
    }
  } catch (error) {
    res.json({ status: 'error', error: 'Post Chat Error' })
  }
})

app.get('/api/notification', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const notification = await Notification.findOne({ userID: _id })

    return res.json({ status: 'ok', notification: notification })
  } catch (error) {
    res.json({ status: 'error', error: 'Failed to retrieve notification' })
  }
})

app.listen(5000, () => {
  console.log('Server started on 5000')
})