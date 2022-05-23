// saturday modification

var Grid = require('gridfs-stream');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const booksRouter = require('./routes/books_router')
const journalsRouter = require('./routes/journals_router');
const userRouter = require('./routes/users_router')
// const pdfRouter = require('./routes/pdf_router')
const db = mongoose.connection;
const connection = mongoose.connection;

// const jszip = require('jszip');
const {
  GridFsStorage
} = require("multer-gridfs-storage");
var crypto = require('crypto');
const multer = require("multer");
var path = require('path');
const fs = require('fs');

dotenv.config();
const app = express();
app.use(express.json());
// app.use(express.urlencoded());
app.use(cors());

app.use('/users',userRouter)
app.use('/book',booksRouter)
app.use('/journals', journalsRouter)
// app.use('/pdf', pdfRouter)


mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Connected to the Database');
  }
);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running in ${PORT}`);
});


const promise = mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true });

const conn = mongoose.connection;
let gfs, gridfsBucket;

conn.once('open',() => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: 'uploads',
    bucketName: 'articleCover'
  })
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads');
  gfs.collection('articleCover');
});

let bucket;
//create storage object
const storage = new GridFsStorage({
  db: promise,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        console.log("Check the file name", filename)
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({
  storage
});

app.post("/pdf/superadmin/journals", upload.single("file"), (req, res) => {
  const tellid = req.file.id
  const tellName= req.file.filename
  console.log(tellName, "This is the name of the file")
  res.status(200).send(tellid);
  // console.log(tellid, "MoyaCheckServer")
}); 


app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    //  return res.json(file)
     const readStream = gridfsBucket.openDownloadStream(file._id);
     readStream.pipe(res)
     console.log(readStream)
   
  });
});

// for article cover
const storageArticleCover = new GridFsStorage({
  db: promise,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'articleCover'
        };
        resolve(fileInfo);
      });
    });
  }
});

const uploadArticleCover = multer({
  storage:  storageArticleCover
});

app.post("/articleCover/superadmin/journals", uploadArticleCover.single("file"), (req, res) => {
  const articleid = req.file.id
  res.status(200).send(articleid);
  const artName= req.file.filename
  console.log(artName, "MoyaCheckServer")
}); 

app.get('/articlefiles/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    //  return res.json(file)
     const readStream = gridfsBucket.openDownloadStream(file._id);
     readStream.pipe(res)
     console.log(readStream)
   
  });
});

// for Book cover
const storageBookCover = new GridFsStorage({
  db: promise,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'bookCover'
        };
        resolve(fileInfo);
      });
    });
  }
});

const uploadBookCover = multer({
  storage:  storageBookCover
});

app.post("/bookCover/superadmin/book", uploadBookCover.single("file"), (req, res) => {
  const bookCoverId = req.file.id
  res.status(200).send(bookCoverId);
  // console.log(tellid, "MoyaCheckServer")
}); 

app.get('/bookfiles/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    //  return res.json(file)
     const readStream = gridfsBucket.openDownloadStream(file._id);
     readStream.pipe(res)
     console.log(readStream)
   
  });
});
