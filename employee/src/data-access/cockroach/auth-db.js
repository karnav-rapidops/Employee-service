const authTable = 'auth';

module.exports = function makeAuthDbMethods({
    pool,
})
{
    return Object.freeze({
        insertAuthDetails,
        updateExpireTime,
        getExpireTime,
        getAllSessions,
        searchSessions,
        deleteSessions,
    })
    
    async function insertAuthDetails({ id, accessToken, expireTime, sessionId, ipAddress, useragent, city, state, country })
    {
        let result = await pool.query(`INSERT INTO ${authTable} (empid, sessionid, accesstoken, expiretime, ipaddress, useragent, city, state, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING empid`, [id, sessionId, accessToken, expireTime, ipAddress, useragent, city, state, country]);       
        return result.rows[0].empid; 
    }
    async function updateExpireTime({ sessionId, newExpireTime })
    {
        let result = await pool.query(`UPDATE ${authTable} SET expiretime = $1 WHERE sessionid = $2 RETURNING empid`, [newExpireTime, sessionId]);
        return result.rows[0].empid;
    }
    async function getExpireTime({ sessionId })
    {
        console.log(sessionId);
        let result = await pool.query(`SELECT expiretime FROM ${authTable} WHERE sessionid = $1`, [sessionId]);
        console.log(result.rows);

        return result.rows[0].expiretime;
    }
    async function getAllSessions({ id, columnToSort, sortingOrder })
    {
        let result = await pool.query(`SELECT * FROM ${authTable} WHERE empid = $1 ORDER BY ${columnToSort} ${sortingOrder}`, [id]);
        return result.rows;
    }
    async function searchSessions({ searchField, searchValue, empid, sortingOrder })
    {
        let result = await pool.query(`SELECT * FROM ${authTable} WHERE ${searchField} = $1 and empid = $2 ORDER BY ${searchField} ${sortingOrder}`, [searchValue, empid]);

        return result.rows;
    }
    async function deleteSessions({ sessionid })
    {
        let result = await pool.query(`DELETE FROM ${authTable} WHERE sessionid = $1 RETURNING empid`, [sessionid])
        return result.rows[0].empid;
    }
}