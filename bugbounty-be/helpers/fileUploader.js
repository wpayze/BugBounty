const multer = require('multer');
const path = require('path');

function generateUniqueFileName(originalName) {
  const timestamp = Date.now();
  const uniqueId = Math.random().toString(36).substr(2, 9);
  const extension = path.extname(originalName);
  const uniqueFileName = `${timestamp}-${uniqueId}${extension}`;
  return uniqueFileName;
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename(req, file, cb) {
    const uniqueFileName = generateUniqueFileName(file.originalname);
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage }).any();

const uploadFiles = (req, res) => new Promise((resolve, reject) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      reject(err);
    } else if (err) {
      reject(err);
    } else {
      const attachments = req.files.map((file) => ({
        url: file.path,
        name: file.filename,
        type: file.mimetype,
        fieldname: file.fieldname,
      }));
      resolve(attachments);
    }
  });
});

module.exports = uploadFiles;
