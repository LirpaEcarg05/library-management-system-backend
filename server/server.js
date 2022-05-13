
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser')
// const cors = require('cors');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const booksRouter = require('./routes/books_router')
// const journalsRouter = require('./routes/journals_router');
// const userRouter = require('./routes/users_router')
// const multer = require('multer')
// const {
//   GridFsStorage
// } = require("multer-gridfs-storage");



// //middleware
// app.use(bodyParser.json())
// dotenv.config();
// const connectionEnvironment = process.env.ATLAS_URI;
// try{
//   mongoose.connect(connectionEnvironment,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
// }catch(error){
//   handleError(error)
// }
// process.on('unhandledRejection',error=>{
//   console.log('unhandledRejection',error.message)
// })

// //creating bucket
// let bucket;
// mongoose.connection.on("connected", () => {
//   var client = mongoose.connections[0].client;
//   var db = mongoose.connections[0].db;
//   bucket = new mongoose.mongo.GridFSBucket(db, {
//     bucketName: "newBucket"
//   });
//   console.log(bucket);
// });


// app.use(express.json());
// app.use(express.urlencoded({
//   extended: false
// }));
// app.use(cors());
// app.use('/users', userRouter)
// app.use('/book', booksRouter)
// app.use('/journals', journalsRouter)

// const storage = new GridFsStorage({
//   url:connectionEnvironment,
//   file: (req,file)=>{
//     return new Promise((resolve,reject)=>{
//       const filename = file.originalname;
//       const fileInfo = {
//         filename: filename,
//         bucketName: "newBucket"
//       }
//       resolve(fileInfo);
//     })
//   }
// })
// const upload = multer({
//   storage 
// })
// app.get("/fileinfo/:filename", (req, res) => {
//   const file = bucket
//     .find({
//       filename: req.params.filename
//     })
//     .toArray((err, files) => {
//       if (!files || files.length === 0) {
//         return res.status(404)
//           .json({
//             err: "no files exist"
//           });
//       }
//       bucket.openDownloadStreamByName(req.params.filename)
//         .pipe(res);
//     });
// });

// app.post("/uploadImage/superadmin/journals", upload.single("file"), (req, res) => {
//   res.status(200)
//     .send("File uploaded successfully");
// });
// // const journalsFile = multer.diskStorage({
// //   destination:(req,file, call)=>{
// //       console.log(req);
// //       call(null,'images/journals/')
// //   },
// //   filename: (req,file,cb)=>{
// //       console.log(file);
// //       cb(null,file.originalname)
// //   }
// // })
// // const uploadJournals= multer({storage:journalsFile})

// // app.use('/uploadImage/superadmin/journals', uploadJournals.single("image"), (req, res) => {
// //   res.send('Image Uploaded')

// // })

// const bookFile = multer.diskStorage({
//   destination: (req, file, call) => {
//     console.log(req);
//     call(null, 'images/books/')
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, file.originalname)
//   }
// })
// const uploadBook = multer({ storage: bookFile })

// app.use('/uploadImage/superadmin/books', uploadBook.single("image"), (req, res) => {
//   res.send('Image Uploaded')

// })

// mongoose.connect(
//   process.env.ATLAS_URI,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   () => {
//     console.log('Connected to the Database');
//   }
// );


// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running in ${PORT}`);
// });
 
//editRehanan

// var Grid = require('gridfs-stream');
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const booksRouter = require('./routes/books_router')
// const journalsRouter = require('./routes/journals_router');
// const userRouter = require('./routes/users_router')
// const {
//   GridFsStorage
// } = require("multer-gridfs-storage");
// var crypto = require('crypto');
// const multer = require("multer");
// var path = require('path');
// const fs = require('fs');

// dotenv.config();
// const app = express();
// app.use(express.json());
// // app.use(express.urlencoded());
// app.use(cors());

// app.use('/users',userRouter)
// app.use('/book',booksRouter)
// app.use('/journals', journalsRouter)


// mongoose.connect(
//   process.env.ATLAS_URI,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   () => {
//     console.log('Connected to the Database');
//   }
// );

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running in ${PORT}`);
// });


// const promise = mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true });

// const conn = mongoose.connection;
// let gfs;

// conn.once('open',() => {
//   gfs = Grid(conn, mongoose.mongo);
//   gfs.collection('uploads');
// });

// //create storage object
// const storage = new GridFsStorage({
//   db: promise,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = file.originalname;
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });

// const upload = multer({
//   storage
// });

// // console.log("This is the size", getFileSize(upload));
// let bucket;
// app.get("/fileinfo/:filename", (req, res) => {
//   const file = bucket
//     .find({
//       filename: req.params.filename
//     })
//     .toArray((err, files) => {
//       if (!files || files.length === 0) {
//         return res.status(404)
//           .json({
//             err: "no files exist"
//           });
//       }
//       bucket.openDownloadStreamByName(req.params.filename)
//         .pipe(res);
//     });
// });
// +

// app.post("/uploadImage/superadmin/journals", upload.single("file"), (req, res) => {
//   res.status(200)
//     .send("File uploaded successfully");
// }); 



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
    bucketName: 'uploads'
  })
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads');
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

app.post("/uploadImage/superadmin/journals", upload.single("file"), (req, res) => {
  const tellid = req.file.id
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

