module.exports = function makeUploadFile({
    gcpStorage,
    storage,
    path,
})
{
    return async function uploadFile({ fileToUpload })
    {
        try{
            const destinationFolder = 'trainee-data/';

            await storage.bucket('experro-dev').upload(`/home/ad.rapidops.com/karnav.gamit/rapidops/Node/Experro/Tasks/companyEmployeeServices/employee/src/uploads/${fileToUpload.filename}` , {
                destination: path.join(destinationFolder, fileToUpload.filename),
              });
        
            return "File uploaded";
        }
        catch(error){
            console.log("error",error);
        }
    }
}