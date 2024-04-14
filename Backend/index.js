import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Card from './models/cardSchema.js';
import multer from 'multer';
import Lawyer from './models/lawyerSchema.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use("/files", express.static("files"));
// Serve static files from the "articles" folder
app.use('/articles', express.static('articles'));

const PORT = 5500;

mongoose.connect('mongodb://127.0.0.1:27017/test', {})
  .then(() => {
    console.log('Connected to MongoDB');
    startServer();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, './images');
    } else if (file.mimetype.startsWith('application/pdf')) {
      cb(null, './files');
    } else {
      cb(new Error('Unsupported file type'), null);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Initialize multer upload
const upload = multer({ storage: storage });

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Save the path to the uploaded file in your MongoDB document
  const filePath = req.file.path; // Path to the uploaded file
  const newDocument = new Document({
    file: filePath,
    name: req.body.name,
    // Add other fields as needed
  });
  newDocument.save()
    .then(document => {
      res.status(201).json(document);
    })
    .catch(err => {
      console.error('Error creating document', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

const startServer = () => {
  app.post('/storeFeedback', (req, res) => {
    const { name, mobile, feedback } = req.body;
  
    const newFeedback = new FeedbackModel({
      name,
      mobile,
      feedback
    });
  
    newFeedback.save()
      .then(savedFeedback => {
        console.log('Feedback stored:', savedFeedback);
        res.status(201).send(savedFeedback);
      })
      .catch(err => {
        console.error('Error storing feedback:', err);
        res.status(500).send('Error storing feedback');
      });
  });

  app.post("/upload-files",upload.single("file"),async(req,res)=>{
    console.log(req.file);
    const title = req.body.title
    const fileName = req.file.filename
    try {
      await pdfSchema.create({title : title, pdf : fileName})
      res.send({status : "ok"})
    } catch (error) {
      res.json( {status : error})
    }
  })

  app.get("/get-files",async(req,res)=>{
    try {
      pdfSchema.find({}).then(data => {
        res.send({status : "ok", data : data})
      })
    } catch (error) {
      
    }
  })

  app.get('/cards/:category', async (req, res) => {
    try {
      const category = req.params.category;
      const cards = await Card.find({ domain: category });
      res.json(cards);
    } catch (err) {
      console.error('Error fetching cards', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Modify your backend code to handle the search endpoint

  // Endpoint for getting PDFs
  app.get('/get-pdfs', async (req, res) => {
    try {
      const pdfs = await Card.find();
      res.json(pdfs);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
    app.get('/cards', async (req, res) => {
    try {
      const cards = await Card.find();
      res.json(cards);
    } catch (error) {
      console.error('Error fetching cards:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/lawyers', async (req, res) => {
    try {
      const cards = await Lawyer.find();
      res.json(cards);
    } catch (error) {
      console.error('Error fetching cards:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Endpoint for retrieving PDFs by card name and language
  app.get('/get-pdf/:cardName/:language', async (req, res) => {
    try {
      const { cardName, language } = req.params;
      const pdf = await Card.findOne({ name: cardName });
      if (pdf) {
        // Assuming pdfs is an array in the document
        const pdfData = pdf.pdfs.find(item => item.language === language);
        if (pdfData) {
          // Send the URL of the PDF file
          res.json({ url: pdfData.url });
        } else {
          res.status(404).json({ error: 'PDF not found for the specified language' });
        }
      } else {
        res.status(404).json({ error: 'PDF not found' });
      }
    } catch (error) {
      console.error('Error fetching PDF:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server and Database Active on port ${PORT}`);
  });
};
