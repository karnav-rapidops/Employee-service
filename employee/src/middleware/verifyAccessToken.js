module.exports = function makeVerifyAccessToken({
    updateExpireTimeDb,
    getExpireTimeDb,
    forbiddenError,
    jwt,
})
{
    return async function verifyAccessToken(req, res, next)
    {
        

        var accessTokenWithBearer = req.headers.authorization;
        var accesstoken = accessTokenWithBearer.replace('Bearer ', '');
    
        const secret = 'mysecret';

        await jwt.verify(accesstoken, secret, async (error, decoded)=>{
            if(error) {
                res.status(401).send("Aceess token invalid!");
            }
            else {
                // If accesstoken is valid then check its expiretime

                // sessionId for which we have to check expiretime
                const sessionId = decoded.sessionId;

                let isAccessTokenExpired = await checkIsAccessTokenExpired({ getExpireTimeDb, sessionId });

                // If accessToken expired send message otherwise update expireTime
                if(isAccessTokenExpired)
                    res.status(401).send("Access token expired!");
                else {

                    let id = await updateExpireTimeDb({ sessionId, newExpireTime: Date.now() + 3600000 });

                    req.id = id;

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