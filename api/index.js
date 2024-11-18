const bodyParser=require("body-parser");
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/User.js');
// const SubadminModel = require('./models/Subadmin.js');
const ContactModel = require('./models/Contact.js');
const OrganisationsModel = require('./models/Organisations.js');
const Restaurant = require('./models/restaurantSchema.js');
const Staff = require("./models/Staff.js")
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes')
// Load environment variables
dotenv.config();
//for ipfs
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const multer = require('multer');
const jwt = require('jsonwebtoken');

// Documents
const Wasa = require('./models/Wasa.js');
const CNIC = require('./models/CNIC.js');
const DTS = require('./models/DTS.js');
const Commercialization = require('./models/Commercialization.js');
const Proof = require('./models/PaymentProof.js');

const PORT=process.env.PORT||5000

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', authRoutes);


app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}))

mongoose.connect('mongodb://localhost:27017/PRBP', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB connected'))
.catch(err => console.error('Failed to connect to MongoDB', err));;

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '30m' });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './uploads'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`); // Save files with a unique name
  }
});

const upload = multer({ storage });

app.post(
  '/wasa',
  upload.fields([
    { name: 'ownershipCertificate' },
    { name: 'buildingPlan' },
    { name: 'locationPlan' },
    { name: 'authorityLetter' },
    { name: 'application' },
    { name: 'drawings' },
    { name: 'parkingAgreement' },
    { name: 'affidavit' },
    { name: 'ekhidmatSlip' }
  ]),
  async (req, res) => {
    try {
      // Extract the uploaded files from the request
      const { formGId } = req.body;
      const {
        ownershipCertificate,
        buildingPlan,
        locationPlan,
        authorityLetter,
        application,
        drawings,
        parkingAgreement,
        affidavit,
        ekhidmatSlip
      } = req.files;

      console.log(req.files); // Log files for debugging

      // Create a new WASA form record in the database
      const newForm = new Wasa({
        formGId: formGId || '',
        ownershipCertificate: ownershipCertificate ? ownershipCertificate[0].path : '',
        buildingPlan: buildingPlan ? buildingPlan[0].path : '',
        locationPlan: locationPlan ? locationPlan[0].path : '',
        authorityLetter: authorityLetter ? authorityLetter[0].path : '',
        application: application ? application[0].path : '',
        drawings: drawings ? drawings[0].path : '',
        parkingAgreement: parkingAgreement ? parkingAgreement[0].path : '',
        affidavit: affidavit ? affidavit[0].path : '',
        ekhidmatSlip: ekhidmatSlip ? ekhidmatSlip[0].path : ''
      });

      // Save the form data
      await newForm.save();

      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({ message: 'Error submitting form', error: error.message });
    }
  }
);

app.post('/cnic', upload.fields([
  { name: 'cnicFront' },
  { name: 'cnicBack' }
]), async (req, res) => {
  try {
      const { cnicFront, cnicBack } = req.files;

      if (!cnicFront || !cnicFront[0]) {
          return res.status(400).json({ message: 'CNIC front file is required' });
      }
      if (!cnicBack || !cnicBack[0]) {
          return res.status(400).json({ message: 'CNIC back file is required' });
      }

      const newForm = new CNIC({
          cnicFront: cnicFront[0].path,
          cnicBack: cnicBack[0].path
      });

      await newForm.save();
      res.status(200).json({ message: 'Form submitted successfully' , formId: newForm._id});
  } catch (error) {
      console.error('Error submitting CNIC form:', error);
      res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
});


app.post('/commercialization', upload.single('commercializationCertificate'), async (req, res) => {
  try {
      const { formGId } = req.body; // Retrieve formGId from the request body
      const { file } = req;         // Retrieve the uploaded certificate file

      if (!file) {
          return res.status(400).json({ message: 'Commercialization certificate file is required' });
      }

      // Create a new Commercialization entry with formGId and certificate path
      const newCertificate = new Commercialization({
          formGId: formGId,          // Store formGId for tracking
          certificatePath: file.path // Store the certificate file path
      });

      await newCertificate.save();
      res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
      console.error('Error submitting commercialization form:', error);
      res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
});



app.post(
  '/dts',
  upload.fields([
    { name: 'formIs' },
    { name: 'menuCard' },
    { name: 'leaseAgreement' },
    { name: 'partnershipDeed' },
    { name: 'incorporationCertificate' },
    { name: 'memorandum' },
    { name: 'FormA' },
    { name: 'Form29' }
  ]),
  async (req, res) => {
    try {
      // Extract files from the request
      const { formGId } = req.body;
      const {
        formIs,
        menuCard,
        leaseAgreement,
        partnershipDeed,
        incorporationCertificate,
        memorandum,
        FormA,
        Form29
      } = req.files;

      // Log uploaded files for debugging
      console.log(req.files);

      // Create a new DTS record in the database
      const newForm = new DTS({
        formGId: formGId || '',
        formIs: formIs ? formIs[0].path : '',
        menuCard: menuCard ? menuCard[0].path : '',
        leaseAgreement: leaseAgreement ? leaseAgreement[0].path : '',
        partnershipDeed: partnershipDeed ? partnershipDeed[0].path : '',
        incorporationCertificate: incorporationCertificate ? incorporationCertificate[0].path : '',
        memorandum: memorandum ? memorandum[0].path : '',
        FormA: FormA ? FormA[0].path : '',
        Form29: Form29 ? Form29[0].path : ''
      });

      // Save the form data
      await newForm.save();

      res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({ message: 'Error submitting form', error: error.message });
    }
  }
);


app.post('/uploadProof', upload.single('file'), async (req, res) => {
  try {
      const { bill, formGId } = req.body;
      const { file } = req;

      if (!file) {
          return res.status(400).json({ message: 'Proof file is required' });
      }

      const newProof = new Proof({
          formGId : formGId,
          bill: bill,
          filePath: file.path,
      });

      await newProof.save();
      res.status(200).json({ message: 'Proof of transfer submitted successfully!' });
  } catch (error) {
      console.error('Error uploading proof:', error);
      res.status(500).json({ message: 'Error uploading proof', error: error.message });
  }
});


app.get('/test', (req,res)=>{
    res.json('test ok')
})

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
      const existingUser = await Staff.findOne({ email });
      if (existingUser) {
        return res.status(400).send('Email already registered');
      }
  
     
      const newUser = new Staff({
        cnic : cnic,
        fname: firstName,
        lname: lastName,
        phone: phoneNumber,
        email: email,
        password: password,
        designation:'businessOwner'
      });
  
      await newUser.save();
      //res.status(201).send('User created successfully');
      res.json({message: "User created successfully"});
    } catch (err) {
      console.error("Error creating user", err);
      //res.status(500).send('Error creating user');
    }
  });

// Create Subadmin
app.post('/subadmin-signup', async (req, res) => {
  const { fname, lname, email, password, cnic, phone, organisation } = req.body;
  //console.log('createSubadmin called from backend ', fname, lname, email, password, cnic, phone, organisation)
  // Check if the subadmin already exists
  const subadminExists = await Staff.findOne({ email });
  if (subadminExists) {
    return res.status(400).json({ message: 'Subadmin already exists' });
  }

  // Create new subadmin
  const subadmin = await Staff.create({
    fname,
    lname,
    email,
    password,
    cnic,
    phone,
    organisation: organisation, // Specific to subadmins
    designation: 'subadmin',
    roles: ['update', 'accept', 'reject'],
  });
  //console.log("before returning: ", subadmin);
  if (subadmin) {
    res.status(201).json({
      _id: subadmin._id,
      fname: subadmin.fname,
      lname: subadmin.lname,
      email: subadmin.email,
      cnic: subadmin.cnic,
      phone: subadmin.phone,
      designation: subadmin.designation,
      organisation:subadmin.organisation,
      roles: subadmin.roles,
    });
  } else {
    res.status(400).json({ message: 'Invalid subadmin data' });
  }
});
app.get('/getSubadminsList', async (req, res) => {
  try {
    const subadmins = await Staff.find({ designation: 'subadmin' });

    if (subadmins.length === 0) {
      return res.status(404).json({ message: 'No subadmins found' });
    }
    res.status(200).json(subadmins);
  } catch (error) {
    console.error('Error retrieving subadmins:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
app.delete('/subadmin/:id', async (req, res) => {
  try {
      const subAdminId = req.params.id;
      console.log('api called to delete su-admin:',subAdminId)
      // Find and delete the sub-admin by ID
      const deletedSubAdmin = await Staff.findByIdAndDelete(subAdminId);

      if (!deletedSubAdmin) {
          return res.status(404).json({ message: 'Sub-admin not found' });
      }

      res.status(200).json({ message: 'Sub-admin deleted successfully' });
  } catch (error) {
      console.error('Error deleting sub-admin:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
app.put('/updateSubAdmin/:id', async (req, res) => {
  try {
      const subAdminId = req.params.id;
      const updates = req.body;
      const updatedSubAdmin = await Staff.findByIdAndUpdate(subAdminId, updates, { new: true });
      if (!updatedSubAdmin) {
          return res.status(404).json({ message: 'Sub-admin not found' });
      }
      res.status(200).json({ message: 'Sub-admin updated successfully', updatedSubAdmin });
  } catch (error) {
      console.error('Error updating sub-admin:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.post ('/admin-signup' ,async (req, res) => {
  const { cnic, fname, lname, email, password, phone } = req.body;

  // Check if the user already exists
  const adminExists = await Staff.findOne({ email });
  if (adminExists) {
    return res.status(400).json({ message: 'Admin already exists' });
  }
  // Create new admin with default admin roles
  const admin = await Staff.create({
    fname,
    lname,
    email,
    password,
    cnic,
    phone,
    designation: 'admin',
    roles: ['create', 'update', 'delete'],
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      fname: admin.fname,
      lname: admin.lname,
      email: admin.email,
      designation: admin.designation,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid admin data' });
  }
});
  app.post('/submission/', async (req, res) => {
    try {
      const restaurant = new Restaurant(req.body);
      await restaurant.save();
      // Only send one response
      
      res.status(201).json({ message: "Form submitted successfully",
                              restaurant : restaurant,
                              formId: restaurant._id});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


  // app.post('/wasa', async (req, res) => {
  //   try {
  //     const wasaForm = new Wasa(req.body);
  //     await wasaForm.save();
  //     // Only send one response
  //     res.status(201).json({ message: "Form submitted successfully", wasaForm });
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // });

//   app.post('/adminLogin', async (req, res) => {
//     const { email, password } = req.body;
//     if(email==="ayesha@gmail.com" && password==="123"){
//         res.json({message: "login successful"});
//     }
//     else{
//         res.json({message: "login unsuccessful"});
//     }
// });
  
//   app.post('/userLogin', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await UserModel.findOne({ email, password });
//         if (!user) {
//             return res.status(401).send('Invalid credentials');
//         }
//         res.json({message: 'login successful', user: user});
//     } catch (err) {
//         console.error("Error finding user", err);
//         res.status(500).send('Error finding user');
//     }
// });

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

  app.post('/renewCertification', async (req, res) => {
    try {
        const renewal = new Renewal(req.body);
        await renewal.save();
        res.status(201).json({ message: 'renewal successful', renewal });
    } catch (error) {
        // Check for duplicate key error specifically on 'certificationNumber'
        if (error.code === 11000 && error.keyPattern && error.keyPattern.certificationNumber) {
            return res.status(400).json({ message: 'Certificate already sent for renewal!' });
        }
        console.error("Unexpected error:", error);  // Log unexpected errors for troubleshooting
        res.status(400).json({ message: 'An error occurred. Please try again later.' });
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


  app.post('/adminLogin', async (req, res) => {
    const { email, password } = req.body;
    if(email==="ayesha@gmail.com" && password==="123"){
        res.json({message: "login successful"});
    }
    else{
        res.json({message: "login unsuccessful"});
    }
});
  
// app.post('/userLogin', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//       const user = await UserModel.findOne({ email, password });
//       if (!user) {
//           return res.status(401).send('Invalid credentials');
//       }
//       res.json({message: 'login successful', user: user});
//   } catch (err) {
//       console.error("Error finding user", err);
//       res.status(500).send('Error finding user');
//   }
// })

// Admin and sud admin Login

app.post('/userLogin', async (req, res) => {
  const { email, password } = req.body;
  const user = await Staff.findOne({ email, password});
  if (user) {
    res.json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      designation: user.designation,
      phone: user.phone,
      cnic: user.cnic,
      organisation: user.organisation,
      token: generateToken(user._id),
      message:'login successful',  // Add success message here

    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
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

app.get('/getStatus/:id', async (req, res) => {
  try{
    console.log("in getStatus backend with id ", req.params.id);
    const form = await Restaurant.findOne({formGId: req.params.id});
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({ status: form.status });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
})

//setStatus

// Route to get organisation details by ID
app.get('/getOrganisationDetails/:id', async (req, res) => {
  try {
    const org = await OrganisationsModel.findOne({ organisationId: req.params.id });

    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json({ name: org.organisationName });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get('/certificates/:cnic', async (req, res) => {
  const { cnic } = req.params;

  try {
    // Query for forms with matching CNIC
    const forms = await Restaurant.find({ OwnerCnic: cnic });

    if (forms.length === 0) {
      return res.status(404).json({ message: 'No forms found for this CNIC' });
    }

    res.status(200).json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/getForms/:currentStatus', async (req, res) => {
  const currentStatus = req.params.currentStatus;
  console.log("org id inside get forms: ",currentStatus);
  try {
    // Query for forms with 'pending' status i.e. status < 7
    const forms = await Restaurant.find({ status: currentStatus });

    console.log("forms found: ", forms);

    if (forms.length === 0) {
      return res.status(404).json({ message: 'No forms found for this organisation' });
    }
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/cancel/:id', async (req, res) => {
  const { id } = req.params;
  console.log("id in cancel api: ", id);
  try {
    // Update the form with matching id and set status to 8
    const result = await Restaurant.updateOne({ _id: id }, { status: 8 });

    if (result.nModified === 0) {
      return res.status(404).json({ message: 'Form to be cancelled cannot be found or is already cancelled' });
    }

    res.status(200).json({ message: 'Form cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling form:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/getDocuments/:formId', async(req, res) => {
  const { formId } = req.params;
  console.log("Fetching documents of form id: ", formId);

  try{
    const forms = await Restaurant.find({ OwnerCnic: cnic });

  }
  catch(e) {
    console.error('Error fetching docs:', e);
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});

  
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}...`);
})