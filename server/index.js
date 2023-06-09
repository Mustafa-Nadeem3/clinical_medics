const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./models/user')
const DoctorProfile = require('./models/doctor_profile')
const PatientProfile = require('./models/patient_profile')

app.use(cors())
app.use(express.json())

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

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
        address: null
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

app.get('/api/display_doctor', async (req, res) => {
  try {
    const doctors = await DoctorProfile.find({});

    return res.json({ status: 'ok', doctors: doctors });
  } catch (error) {
    console.error('Error retrieving documents:', error);
    res.json({ status: 'error', error: 'Failed to retrieve doctor profiles' });
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
      }
    )

    return res.json({ status: 'ok', _id: profile._id, firstName: profile.firstName, lastName: profile.lastName, email: profile.email })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: ' invalid token in post d profile' })
  }
})

app.get('/api/patient_profile', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const _id = decoded._id
    const profile = await PatientProfile.findOne({ _id: _id })

    return res.json({ status: 'ok', _id: profile._id, profileImage: profile.profileImage, firstName: profile.firstName, lastName: profile.lastName, email: profile.email, profession: profile.profession, address: profile.address })
  } catch (error) {
    res.json({ status: 'error', error: ' invalid token in p profile' })
  }
})

app.post('/api/patient_profile', async (req, res) => {
  const token = req.headers['x-access-token']

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
        address: req.body.address
      },
      { new: true }
    )

    return res.json({ status: 'ok', _id: profile._id, firstName: profile.firstName, lastName: profile.lastName, email: profile.email })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: ' invalid token in p profile' })
  }
})

app.post('/api/appointment_request', async (req, res) => {

  try {
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: decryptedPassword,
      profession: req.body.profession,
    })

    res.json({ status: 'ok' })
  } catch (err) {
    console.log(err) // To check errors
    res.json({ status: 'error', error: 'Duplicate Email' })
  }
})

app.listen(5000, () => {
  console.log('Server started on 5000')
})