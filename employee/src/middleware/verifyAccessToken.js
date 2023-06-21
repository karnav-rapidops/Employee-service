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
                console.log("verifytoken",error);
                res.send("Aceess token invalid!");
            }
            else {
                // If accesstoken is valid then check its expiretime

                // sessionId for which we have to check expiretime
                const sessionId = decoded.sessionId;

                let isAccessTokenExpired = await checkIsAccessTokenExpired({ getExpireTimeDb, sessionId });

                if(isAccessTokenExpired)
                    res.send("Access token expired!");
                else {
                    // Update expiretime of accesstoken for user.
                    let empid = await updateExpireTimeDb({ sessionId, newExpireTime: Date.now() + 3600000 })
                }
            }
        })
        
        next();
    }

    async function checkIsAccessTokenExpired({ getExpireTimeDb, sessionId })
    {
        let expireTime = await getExpireTimeDb({ sessionId });
        let currentTime = Date.now();

        if(currentTime < expireTime)
            return false;
        else    
            return true;
    }   
}   