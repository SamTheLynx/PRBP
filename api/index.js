const bodyParser=require("body-parser");
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/User.js');
const SubadminModel = require('./models/Subadmin.js');
const ContactModel = require('./models/Contact.js');
const Restaurant = require('./models/restaurantSchema.js');
const Wasa = require('./models/Wasa.js');
const nodemailer = require("nodemailer");

//for ipfs
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const multer = require('multer');

const PORT=process.env.PORT||5000

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}))

mongoose.connect('mongodb://localhost:27017/Restaurant', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB connected'))
.catch(err => console.error('Failed to connect to MongoDB', err));;



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './uploads'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`); // Save files with a unique name
  }
});

const upload = multer({ storage });

app.post('/wasa', upload.fields([
  { name: 'ownershipCertificate' },
  { name: 'buildingPlan' },
  { name: 'locationPlan' },
  { name: 'commercializationCertificate' },
  { name: 'authorityLetter' }
]), async (req, res) => {
  try {
      // Extract the uploaded files from the request
      const { ownershipCertificate, buildingPlan, locationPlan, commercializationCertificate, authorityLetter } = req.files;

      console.log(req.files);

      // Create a new WASA form record in the database
      const newForm = new Wasa({
          ownershipCertificate: ownershipCertificate[0].path,
          buildingPlan: buildingPlan[0].path,
          locationPlan: locationPlan[0].path,
          commercializationCertificate: commercializationCertificate[0].path,
          authorityLetter: authorityLetter[0].path
      });

      // Save the form data
      await newForm.save();

      res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
});








app.get('/test', (req,res)=>{
    res.json('test ok')
})

app.get("/api/subadmins", async (req, res) => {
  try {
    const subAdmins = await SubadminModel.find();
    res.json(subAdmins);
  } catch (error) {
    console.error("Error fetching SubAdmins:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.delete("/api/subadmins/:id", async (req, res) => {
  try {
    const subAdminId = req.params.id;
    const deletedSubAdmin = await SubadminModel.findByIdAndDelete(subAdminId);
    if (!deletedSubAdmin) {
      return res.status(404).json({ message: "SubAdmin not found" });
    }
    res.status(200).json({ message: "SubAdmin deleted successfully" });
  } catch (error) {
    console.error("Error deleting SubAdmin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to send rejection email
app.post('/send-rejection-email', async (req, res) => {
  const { email, reason } = req.body; //add org name
  console.log(email)
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ayesha.ahmedd2000@gmail.com',
        pass: 'curb gzvw bbyr rsnd', // Use the app password generated for nodemailer
      },
    });
    const mailOptions = {
      from: 'ayesha.ahmedd2000@gmail.com', // Sender email address
      to: email,
      subject: 'Form Rejection Notification',
      text:  `Dear Applicant,\n\nWe regret to inform you that your form has been rejected due to the following reason:\n\n${reason}\n\nSincerely,\nThe Admin Team`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error sending rejection mail' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email sent successfully' });
      }
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }

  console.log('After sending....')
});

app.post("/updateAccount", async (req, res) => {

    const { cnic, phone, email } = req.body.payload;

    try {
        const user = await UserModel.findOne({ cnic });
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.phone = phone;
        user.email = email;
        await user.save();
        res.json({ message: "User updated successfully", user: user });
    } catch (e) {
        console.error("Error updating user", e);
        res.status(500).send('Error updating user');
    }
});

app.post('/contactus', async (req, res) => {
    const { name, email, message } = req.body;
    console.log("Received data:", req.body);
    try {
      const newUser = new ContactModel({
        name: name,
        email: email,
        message: message
      });
  
      await newUser.save();
      //res.status(201).send('User created successfully');
      res.json({message: "User created successfully"});
    } catch (err) {
      console.error("Error creating user", err);
      //res.status(500).send('Error creating user');
    }
  });

app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber, cnic} = req.body;
    console.log("Received data:", req.body);
    try {
      // Check if the email is already registered
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send('Email already registered');
      }
  
     
      const newUser = new UserModel({
        cnic : cnic,
        fname: firstName,
        lname: lastName,
        phone: phoneNumber,
        email: email,
        password: password,
      });
  
      await newUser.save();
      //res.status(201).send('User created successfully');
      res.json({message: "User created successfully"});
    } catch (err) {
      console.error("Error creating user", err);
      //res.status(500).send('Error creating user');
    }
  });

  app.post('/subadminSignup', async (req, res) => {
    const { firstName, lastName, email, password, number, cnic, organization} = req.body;
    console.log("Received data:", organization);
    console.log("req.body: ", req.body)
    try {
      // Check if the email is already registered
      const existingUser = await SubadminModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send('Email already registered');
      }
  
      //Create a new admin user
      const newUser = new SubadminModel({
        cnic : cnic,
        fname: firstName,
        lname: lastName,
        phone: number,
        email: email,
        password: password,
        role: role
      });
  
      await newUser.save();
      console.log("org of new subadmin: ", newUser.cnic);
      //res.status(201).send('User created successfully');
      res.json({message: "User created successfully"});
    } catch (err) {
      console.error("Error creating user", err);
      //res.status(500).send('Error creating user');
    }
  });

  app.post('/submission', async (req, res) => {
    try {
      const restaurant = new Restaurant(req.body);
      await restaurant.save();
      // Only send one response
      res.status(201).json({ message: "Form submitted successfully", restaurant });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


  app.post('/wasa', async (req, res) => {
    try {
      const wasaForm = new Wasa(req.body);
      await wasaForm.save();
      // Only send one response
      res.status(201).json({ message: "Form submitted successfully", wasaForm });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });











  app.post('/subadminLogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const subadmin = await SubadminModel.findOne({ email, password });
        if (!subadmin) {
            return res.status(401).send('Invalid credentials');
        }
        res.json({message: 'login successful', subadmin: subadmin});
    } catch (err) {
        console.error("Error finding subadmin", err);
        res.status(500).send('Error finding subadmin');
    }
  });

  app.post('/adminLogin', async (req, res) => {
    const { email, password } = req.body;
    if(email==="ayesha@gmail.com" && password==="123"){
        res.json({message: "login successful"});
    }
    else{
        res.json({message: "login unsuccessful"});
    }
});
  
  app.post('/userLogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email, password });
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }
        res.json({message: 'login successful', user: user});
    } catch (err) {
        console.error("Error finding user", err);
        res.status(500).send('Error finding user');
    }
});

app.post("/resetPassword", async (req, res) => {
  const { email, password, repassword } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Generate OTP
    const otp = generateOTP();
    console.log("otp: ", otp);

    // Store OTP
    otpStore.set(email, { password, otp });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ayesha.ahmedd2000@gmail.com',
        pass: 'curb gzvw bbyr rsnd', // Use the app password generated for nodemailer
      },
    });

    // Send OTP to user's email
    const mailOptions = {
      from: 'ayesha.ahmedd2000@gmail.com', // Sender email address
      to: email,
      subject: 'Verification OTP',
      text: `Your OTP for resetting password is: ${otp}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error sending OTP' });
      } else {
        console.log('Email sent: ' + info.response);
        res.json({ message: "OTP Sent" });
      }
    });
  } catch (err) {
    res.json({ message: "Error creating user", error: err });
    console.log("Error Creating User", err);
  }
});

app.post("/verifyOTP", async (req, res) => {
  const { email, otp, password } = req.body;
  console.log(req.body);

  const storedData = otpStore.get(email);

  // console.log('storedDat',storedData);
  // console.log('storedDataotp',storedData.otp.toString());
  if (!storedData || storedData.otp.toString() !== otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
    console.log("Before:")
  }
  try {
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
     const testPassword = "123"
    user.password =testPassword
    console.log("User before saving:", user); // Log the user object before saving
    await user.save();
    console.log("User after saving:", user); // Log the user object after saving

    // otpStore.delete(email);
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting password', error: err });
    console.log('Error resetting password', err);
  }
});



//--------------------------IPFS-----------------------------------------------------------------------

const PINATA_API_KEY = '44ab669b997aa2b47652';
const PINATA_API_SECRET = '59f5dc6834cd964d1a698e95764f3d02ba3429238bae09a2103061f09b37cc68';



app.post('/uploadToIpfs', upload.single('file'), async (req, res) => {
  try {
    console.log("in backend try!");
      const file = req.file;
      const { filename } = req.body;
      if (!file) {
          return res.status(400).send('No file uploaded.');
      }

      const formData = new FormData();
      formData.append('file', file.buffer, filename);

      const metadata = JSON.stringify({
          name: filename,
          keyvalues: {
              exampleKey: 'exampleValue'
          }
      });
      formData.append('pinataMetadata', metadata);

      const pinataOptions = JSON.stringify({
          cidVersion: 0,
      });
      formData.append('pinataOptions', pinataOptions);

      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
          maxBodyLength: 'Infinity', // this is needed to prevent axios from erroring out with large files
          headers: {
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
              'pinata_api_key': PINATA_API_KEY,
              'pinata_secret_api_key': PINATA_API_SECRET
          }
      });

      console.log('File uploaded to IPFS:', response.data);
      res.json({ IpfsHash: response.data.IpfsHash });
  } catch (error) {
      console.error('Error uploading file to IPFS:', error);
      res.status(500).send('Error uploading file to IPFS');
  }
});

//-----------------------------------------------------------------------------------------------------
  
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}...`);
})