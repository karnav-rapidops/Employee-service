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
    return async function insertEmployee({ empname, designation, email, cname, password })
    {
        const {error} = validateInsertEmployee({ cname, empname, email, designation, password })
        if(error)
            throw new validationError(error.message);

        // Check if email already registered or not , give forbidden error otherwise
        // let employeeDetails = await isEmailExistDb({ email })
        // if(employeeDetails)
        //     throw new forbiddenError('Email already exist!');

        let cid = await getCompanyIdByName({ cname });

        let employeeid = await insertEmployeeDb({ empname, designation, email, cid, password });  

        // Generate JWT verification token
        let verificationToken = generateVerificationToken({ employeeid })

        // Sending employeeName, employeeEmail, companyName, verification_token in producer
        await producer({ 
            topic: 'employee-registred',
            message: { employeeid, empname, email, cname, verificationToken } 
        })

        return employeeid;        
    }

    function validateInsertEmployee({ cname, empname, email, designation, password   })
    {
        const schema = Joi.object({
            empname: Joi.string().min(1).max(15).required(),
            designation: Joi.string().min(1).max(15).required(),
            email: Joi.string().required(),
            cname: Joi.string().min(1).max(15).required(),
            password: Joi.string().max(15).required(),
        })
        return schema.validate({ cname, empname, email, designation, password })
    }

    function generateVerificationToken({ employeeid })
    {
        const secret = 'mysecret';

        let verificationToken = jwt.sign({employeeid}, secret, {expiresIn: '1h'})
        return verificationToken;
    }
}