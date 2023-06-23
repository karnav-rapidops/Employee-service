module.exports = function makeVerifyEmployeeAction({
    verifyEmployee,
})
{
    return async function verifyEmployeeAction(req, res)
    {
        try {
            let verificationToken = req.params.verificationToken;

            let result = await verifyEmployee({ verificationToken });
            
            if(result)
            {
                res.status(200).send("Token verified!");
            }
            else{
                res.status(401).send("Invalid token or token expired!");
            }

        } catch (error) {
            res.status(error.httpStatusCode).send(error.message);   
        }
            
    }
}