module.exports = function makeVerifyEmployee({
    updateVerificationstatusDb,
    jwt,
})
{
    return async function verifyEmployee({ verificationToken })
    {
        const secret = 'mysecret';

        const decoded = jwt.verify(verificationToken, secret);

        console.log("decoded:\n", decoded);

        if(decoded.employeeid)
        {
            let result = await updateVerificationstatusDb({status: 'true', empid: decoded.employeeid});
        }

        return decoded.employeeid;
    }
}