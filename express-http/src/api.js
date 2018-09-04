import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
const router = express.Router();

const fileFolder = 'uploads';

// THIS IS INSECURE FOR REAL WORLD APPS (since I am the only one using this (on a rasp) i am fine)
// READ more at https://github.com/expressjs/multer/issues/439
const originalFilenameStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, fileFolder))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const multerConfig = {
  storage: originalFilenameStorage,
  // storage: multer.diskStorage({
  //   //Setup where the user's file will go
  //   destination: (req, file, next) => {
  //     next(null, path.join(__dirname, fileFolder));
  //   },

  //   //Then give the file a unique name
  //   filename: (req, file, next) => {
  //     const ext = file.mimetype.split('/')[1];
  //     next(null, file.fieldname + '-' + Date.now() + '.' + ext);
  //   }
  // }),

  //A means of ensuring only images are uploaded. 
  // fileFilter: (req, file, next) => {
  //   if (!file) {
  //     next({
  //       error: 'Invalid file type.'
  //     });
  //   }
  //   const image = file.mimetype.startsWith('image/');
  //   if (image) {
  //     console.log('photo uploaded');
  //     next(null, true);
  //   } else {
  //     console.log("file not supported");
  //     return next(null, false);
  //   }
  // }
};

router.get('/file/:name', (req, res) => {
  res.sendFile(path.join(__dirname, fileFolder, req.params.name));
})

router.get('/files', async (req, res, next) => {
  const files = await promisify(fs.readdir)(path.join(__dirname, fileFolder))
  
  const parsedFiles = await Promise.all(files.map(async fileName => {
    const stats = await promisify(fs.stat)(path.join(__dirname, fileFolder, fileName));
    return {
      name: fileName,
      size: stats.size,
      url: `http://localhost:3000/api/file/${fileName}`
    };
  }));
    
  res.json({
    files: parsedFiles
  });
})

router.post('/upload', multer(multerConfig).single('photo'), (req, res) => {
  res.json({
    done: true
  });
});

export default router;