import express from 'express';
import path from 'path';
import multer from 'multer';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors())

const multerConfig = {
  storage: multer.diskStorage({
    //Setup where the user's file will go
    destination: (req, file, next) => {
      next(null, './');
    },

    //Then give the file a unique name
    filename: (req, file, next) => {
      console.log(file);
      const ext = file.mimetype.split('/')[1];
      next(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
  }),

  //A means of ensuring only images are uploaded. 
  fileFilter: (req, file, next) => {
    if (!file) {
      next();
    }
    const image = file.mimetype.startsWith('image/');
    if (image) {
      console.log('photo uploaded');
      next(null, true);
    } else {
      console.log("file not supported");

      //TODO:  A better message response to user on failure.
      return next();
    }
  }
};

app.post('/upload', multer(multerConfig).single('photo'), (req, res) => {
  res.send('Complete!');
});

app.listen(port, () => console.log(`Listening on port: ${port}`))