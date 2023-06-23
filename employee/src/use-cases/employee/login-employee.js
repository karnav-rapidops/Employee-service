module.exports = function makeLoginEmployee({
    isEmailExistDb,
    insertAuthDetailsDb,
    validationError,
    forbiddenError,
    objectNotFound,
    uuid,
    Joi,
    jwt,
})
{
    return async function loginEmployee({ email, password, useragent, locationData })
    {
        // Validate entred email and password
        const { error } = validateLoginEmployee({ email, password });
        if(error) {
            throw validationError(error.message);
        }
        
        // check whether user with email exist or not
        const employeeDetails = await isEmailExistDb({ email });
        if(!employeeDetails)
            throw new objectNotFound('Invalid Email!');

        // check whether password is valid or not
        if(!isPasswordValid({ enteredPassword: password, registeredPassword: employeeDetails.password }))
            throw new forbiddenError('Invalid credentials!');

        // check whether employee is verified or not 
        if(employeeDetails.isverified == 'false')
            throw new forbiddenError('Verify your email!');
        
        // Generate sessionId for user who is going to be logged in 
        const sessionId = uuid.v1();

        // Generate Access token 
        let accessToken = generateAccessToken({ empid: employeeDetails.empid, sessionId})

        // change country code into country name i.e 'IN' => 'India'
        changeCountryCodeIntoCountryName(locationData);

        // Insert into auth table
        let insertedEmployeeId = await insertAuthDetailsDb({ id: employeeDetails.empid, accessToken, expireTime: Date.now() + 3600000, sessionId, ipAddress: locationData.ip, useragent, city: locationData.city, state: locationData.region, country: locationData.country })

        return accessToken;
    }
    function validateLoginEmployee({ email, password })
    {
        const schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().max(15).required(),
        })

        return schema.validate({ email, password })
    }
    function generateAccessToken({ empid, sessionId })
    {   
        const secret = 'mysecret';
        let accessToken = jwt.sign({ empid, sessionId }, secret);
        return accessToken;
    }
    function isPasswordValid({ enteredPassword, registeredPassword })
    {
        let isValid;

        ( enteredPassword == registeredPassword ) ? (isValid = 'true') : (isValid = 'false')

        return isValid;
    }
    function changeCountryCodeIntoCountryName(locationData)
    {   
        const displayNames = new Intl.DisplayNames(['en'], { type: 'region' })

        locationData['country'] = displayNames.of(locationData['country']);
    }
}