module.exports = function makeDownloadFileAction({
    downloadFile,
})
{
    return async function downloadFileAction(req, res)
    {
        try {
            const fileName = req.params.fileName;

            const fileLink = await downloadFile({ fileName });

            res.send(fileLink)
        }
        catch(error) {
            res.send(error.message);
        }
    }
}