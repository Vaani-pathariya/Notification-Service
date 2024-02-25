const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const cors = require('cors');
const { notificationQueue } = require('./producer');
const app = express();
const port = 8000;
app.use(cors());

// Configure multer to handle multipart/form-data
const upload = multer();

// Endpoint to receive Excel file
app.post('/upload', upload.single('excelFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Read the uploaded Excel file
  const { subject, text } = req.body;
  const workbook = XLSX.read(req.file.buffer);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet);

  // Process the data or do whatever you need with it
  console.log(jsonData);// jsonData is a list of objects containing all the information 
  jsonData.forEach(async(item)=>{
    await notificationQueue.add("email",{
      email:item.Email,
      name:item['Name'],
      subject:subject,
      text:text
    });
    console.log("Added Email")
  })
  // Send a response back to the client
  res.send('File uploaded successfully.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
