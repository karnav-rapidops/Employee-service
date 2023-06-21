module.exports = function makeDownloadFile({
    storage,
    gcpStorage,
    path,  
})
{
    return async function downloadFile({
        filename
    }) {
        const bucket = storage.bucket(gcpStorage.bucketName);

        const [metaData] = await bucket.file(`trainee-data/${filename}`).getMetadata();
        return metaData.mediaLink;
    }
}