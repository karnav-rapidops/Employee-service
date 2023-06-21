module.exports = function makeVerifyEmployeeAction({
    verifyEmployee,
})
{
    return async function verifyEmployeeAction(req, res)
    {
            let verificationToken = req.params.verificationToken;

            console.log({ verificationToken })

            let result = await 
            ({ verificationToken });
            
            if(result)
            {
                res.send("Token verified!");
            }
            else{
                res.send("Invalid token or token expired!");
            }

    }
}