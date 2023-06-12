module.exports = function makeVerifyAccessToken({
    updateExpireTimeDb,
    getExpireTimeDb,
    forbiddenError,
    jwt,
})
{
    return async function verifyAccessToken(req, res, next)
    {
        const accesstoken = req.headers.accesstoken;
        const secret = 'mysecret';

        await jwt.verify(accesstoken, secret, async (error, decoded)=>{
            if(error) {
                res.send("Aceess token invalid!");
            }
            else {
                // If accessToken is valid then check its expiretime

                // Sessionid for which we have to check expiretime

                const sessionid = decoded.sessionid;

                let isAccessTokenExpired = await checkIsAccessTokenExpired({ getExpireTimeDb, sessionid });

                if(isAccessTokenExpired)
                    res.send("Access token expired!");
                else {
                    // Update expiretime of accesstoken for user.
                    let empid = await updateExpireTimeDb({ sessionid, newExpireTime: Date.now() + 3600000 })
                }
            }
        })
        
        next();
    }

    async function checkIsAccessTokenExpired({ getExpireTimeDb, sessionid })
    {
        let expireTime = await getExpireTimeDb({ sessionid });
        let currentTime = Date.now();

        if(currentTime < expireTime)
            return false;
        else    
            return true;
    }   
}