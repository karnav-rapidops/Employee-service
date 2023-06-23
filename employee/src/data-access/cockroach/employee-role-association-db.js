const employeeRoleAssociationTable = 'employee_role_association';

module.exports = function makeEmployeeRoleAssociationDbMethods({
    pool,
    databaseError, 
})
{
    return Object.freeze({
        getRoleId,
        assignRole,
    })

    async function getRoleId({ employeeId })
    {
        try {
            console.log("\nGET-ROLE-ID-DB-FUNCTION: ", employeeId)
            const result = await pool.query(`SELECT roleid FROM ${employeeRoleAssociationTable} WHERE empid = $1`, [employeeId]);
            console.log("result:", result.rows);

            return result.rows[0]?.roleid;

        } catch (error) {
            console.error(error.message);
            throw new databaseError(error.message);
        }
    }
    async function assignRole({ employeeId, roleId })
    {
        try {
            await pool.query(`INSERT INTO ${employeeRoleAssociationTable} (roleid, empid) VALUES ($1, $2)`, [roleId, employeeId]);

            return;
        } catch (error) {
            console.error(error.message);
            throw new databaseError(error.message);
        }
    }

}