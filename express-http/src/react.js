import express from 'express';
import path from 'path';
const router = express.Router();

const buildFolder = [__dirname, '../..', 'build'];

// Use react build files
router.use(express.static(path.join(...buildFolder)));

// route all GET paths to react index SPA
router.get('*', (req, res) => {
  return res.sendFile(path.join(...buildFolder, 'index.html'));
})

export default router;