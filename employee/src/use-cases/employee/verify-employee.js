module.exports = function makeVerifyEmployee({
    updateVerificationstatusDb,
    jwt,
})
{
    return async function verifyEmployee({ verificationToken })
    {
        const secret = 'mysecret';

        const decoded = jwt.verify(verificationToken, secret);

        
            let result = await updateVerificationstatusDb({status: 'true', id: decoded.employeeId});
        
    
        return 'employee is verified';
    }
}