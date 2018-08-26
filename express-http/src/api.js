import express from 'express';
import multer from 'multer';
const router = express.Router();

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
      next({
        error: 'Invalid file type.'
      });
    }
    const image = file.mimetype.startsWith('image/');
    if (image) {
      console.log('photo uploaded');
      next(null, true);
    } else {
      console.log("file not supported");
      return next(null, false);
    }
  }
};

router.post('/upload', multer(multerConfig).single('photo'), (req, res) => {
  res.json({
    done: true
  });
});

export default router;