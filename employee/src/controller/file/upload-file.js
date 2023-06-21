module.exports = function makeUploadFileAction({
    uploadFile,
})
{
    return async function uploadFileAction(req, res)
    {
        const fileToUpload = req.file;

        let result = await uploadFile({ fileToUpload });

        res.send(result);
    }
}