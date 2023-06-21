// NPMs
const { gcpStorage } = require('../../config')
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
    keyFilename: "use-cases/file/gcp-service-account-key.json",
});

// Use-cases maker function
const makeUploadFile = require('./upload-file-gcc');
const makeDownloadFile = require('./download-file');

const uploadFile = makeUploadFile({
    gcpStorage,
    storage,
    path    
})

const downloadFile = makeDownloadFile({
    storage,
    gcpStorage,
    path,  
})


module.exports = Object.freeze({
    uploadFile,
    downloadFile,
})