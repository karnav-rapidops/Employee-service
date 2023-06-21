const multer = require('multer')

// Creating a storage-engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

// Creating a multer instance
const upload = multer({ storage: storage });



// Exporting 'upload' middleware function (multer instance)
module.exports = upload;



