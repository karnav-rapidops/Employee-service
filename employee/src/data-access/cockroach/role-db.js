const roleTable = 'role';

module.exports = function makeRoleDbMethods({
    pool,
    databaseError, 
})
{
    return Object.freeze({
        addRole,
        deleteRole,
        getRole,
    })

    async function addRole({ roleName, permission, companyId, isMaster })
    {
        try {

            console.log({ roleName, permission, companyId, isMaster })

            const result = await pool.query(`INSERT INTO ${roleTable} (rolename, permission, compnayid, ismaster) VALUES ($1, $2, $3, $4) RETURNING roleid`, [roleName, permission, companyId, isMaster]);

            return result.rows[0]?.roleid;

        } catch (error) {
            console.error(error);
            throw new databaseError(error.message);
        }
    }
    async function deleteRole({ roleId })
    {
        try 
        {
            const result = await pool.query(`DELETE FROM ${roleTable} WHERE roleid = $1 RETURNING roleid`, [roleId]);

            return result.rows[0]?.roleid;
            
        } catch (error) {
            console.error(error);
            throw new databaseError(error.message);
        }
    }
    async function getRole({ roleId })
    {
        try {
            const result = await pool.query(`SELECT * FROM ${roleTable} WHERE roleid = $1`, [roleId]);

            return result?.rows[0];
        } catch (error) {
            console.error(error);
            throw new databaseError(error.message); 
        }
    }
    

}