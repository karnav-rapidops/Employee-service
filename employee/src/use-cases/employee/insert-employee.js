module.exports = function makeInsertEmployee({
    insertEmployeeDb,
    isEmailExistDb,
    validationError,
    forbiddenError,
    producer,
    getCompanyIdByName,
    Joi,
    jwt,
})
{
    return async function insertEmployee({ name, designation, email, companyName, password })
    {
        console.log("Insert-employee-usecase");

        const {error} = validateInput({ companyName, name, email, designation, password })
        if(error)
            throw new validationError(error.message);

        // Check if email already registered or not , give forbidden error otherwise
        // let employeeDetails = await isEmailExistDb({ email });
        // if(employeeDetails)
        //     throw new forbiddenError('Email already exist!');

        let companyId = await getCompanyIdByName({ name: companyName });
        
        let employeeId = await insertEmployeeDb({ name, designation, email, companyId, password });  
        
        
        // Generate JWT verification token  
        let verificationToken = generateVerificationToken({ employeeId })

        // Sending employeeName, employeeEmail, companyName, verification_token in producer
        await producer({ 
            topic: 'employee-registred',
            message: { employeeId, name, email, companyName, verificationToken } 
        })

        return employeeId;        
    }

    function validateInput({ companyName, name, email, designation, password })
    {
        const schema = Joi.object({
            name: Joi.string().min(1).max(15).required(),
            designation: Joi.string().min(1).max(15).required(),
            email: Joi.string().required(),
            companyName: Joi.string().min(1).max(15).required(),
            password: Joi.string().max(15).required(),
        })
        return schema.validate({ companyName, name, email, designation, password })
    }

    function generateVerificationToken({ employeeId })
    {
        const secret = 'mysecret';

        let verificationToken = jwt.sign({employeeId}, secret, {expiresIn: '1h'})
        return verificationToken;
    }
}