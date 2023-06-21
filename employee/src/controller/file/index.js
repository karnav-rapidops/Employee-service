const file = require('../../use-cases/file');

const makeDownloadFileAction = require('./downloadFile');
const makeUploadFileAction = require('./upload-file') 

const downloadFileAction = makeDownloadFileAction({
    downloadFile: file.downloadFile,
})
const uploadFileAction = makeUploadFileAction({
    uploadFile: file.uploadFile,
})

module.exports = Object.freeze({
    downloadFileAction,
    uploadFileAction,
})