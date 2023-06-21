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
            // clientIp = '202.131.125.122';

            // Get user location information
            let locationData = await getEmployeeLocation({ clientIp });

            // call to login-usecase 
            let result = await loginEmployee({ email, password, useragent, locationData });

            res.send(result);
        }
        catch(error) {
            res.send(error.message);
        }
    }
}