
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const booksRouter = require('./routes/books_router')
const journalsRouter = require('./routes/journals_router');
const userRouter = require('./routes/users_router')



dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const multer=require('multer')

app.use('/users',userRouter)
app.use('/book',booksRouter)
app.use('/journals', journalsRouter)


const journalsFile = multer.diskStorage({
  destination:(req,file, call)=>{
      console.log(req);
      call(null,'images/journals/')
  },
  filename: (req,file,cb)=>{
      console.log(file);
      cb(null,file.originalname)
  }
})
const uploadJournals= multer({storage:journalsFile})

app.use('/uploadImage/superadmin/journals',uploadJournals.single("image"), (req,res)=>{
  res.send('Image Uploaded')
  
  })

  const bookFile = multer.diskStorage({
    destination:(req,file, call)=>{
        console.log(req);
        call(null,'images/books/')
    },
    filename: (req,file,cb)=>{
        console.log(file);
        cb(null,file.originalname)
    }
  })
  const uploadBook= multer({storage:bookFile})
  
  app.use('/uploadImage/superadmin/books',uploadBook.single("image"), (req,res)=>{
    res.send('Image Uploaded')
    
    })

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

