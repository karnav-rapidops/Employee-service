module.exports = function makeLoginEmployeeAction({
    loginEmployee,
    getEmployeeLocation,
})
{
    return async function loginEmployeeAction(req, res)
    {
        try {            
            let email = req.body.email;
            let password = req.body.password;
            let useragent = req.headers.useragent;
            let clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

            // Get user location information
            let locationData = await getEmployeeLocation({ clientIp });

            // call to login-usecase 
            let accessToken = await loginEmployee({ email, password, useragent, locationData });
            res.setHeader('authorization',accessToken);
            res.status(200).send('Login Successfull!!');
        }
        catch(error) {
            res.status(500).send(error.message);
        }
    }
}