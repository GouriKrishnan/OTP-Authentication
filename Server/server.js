const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const OTPModel = require('./models/OTPModel');
const { generateOTP } = require('./utils'); 

const app = express();
const PORT = 3000;

// Connect to MongoDB 
mongoose.connect('mongodb://localhost:27017/OtpDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a mongoose schema and model for storing OTP data
const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
});

const OTPModel = mongoose.model('OTP', otpSchema);

app.use(cors());
app.use(bodyParser.json());

// Mock API endpoint for sending OTP
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP(); // utility

  // Save OTP to the database
  const otpData = new OTPModel({ email, otp });
  await otpData.save();

  // Mock response with OTP
  res.json({ otp });
});

// API endpoint for OTP validation
app.post('/validate-otp', async (req, res) => {
  const { email, enteredOTP } = req.body;

  // Find OTP data in the database
  const otpData = await OTPModel.findOne({ email, otp: enteredOTP });

  if (otpData) {
    // If OTP is matched, remove the entry from the database
    await OTPModel.deleteOne({ email, otp: enteredOTP });
    res.json({ matched: true });
  } else {
    // If OTP is not matched, send an error response
    res.status(400).json({ matched: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
