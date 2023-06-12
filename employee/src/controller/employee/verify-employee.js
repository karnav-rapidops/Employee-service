module.exports = function makeVerifyEmployeeAction({
    verifyEmployee,
})
{
    return async function verifyEmployeeAction(req, res)
    {
            let verificationToken = req.params.verificationToken;
            let empid = req.params.empid;

            let result = await verifyEmployee({ empid, verificationToken });
            
            if(result)
            {
                res.send("Token verified!");
            }
            else{
                res.send("Invalid token or token expired!");
            }

    }
}