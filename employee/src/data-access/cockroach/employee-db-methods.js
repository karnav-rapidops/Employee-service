const employeeTable = 'employee';

module.exports = function makeEmployeeDbMethods({
    pool,
})
{
    return Object.freeze({
        insertEmployee,
        updateEmployeeName,     
        getEmployeebyId,
        updateEmployeeDesignation,
        getEmployeeByCompanyId,
        deleteEmployeeById,
        deleteEmployeeByCompanyId,
        updateVerificationStatus,
        isPasswordValid,
        isEmployeeVerified,
        isEmailExist,
    })

    async function insertEmployee({ empname, cid, designation, email, password })
    {
        let result = await pool.query(`INSERT INTO ${employeeTable} (cid, empname, designation, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING empid`, [cid, empname, designation, email, password]);        
        return result.rows[0].empid;
    }
    async function updateEmployeeName({ empid, empname })
    {

        let result = await pool.query(`UPDATE ${employeeTable} SET empname = $1 WHERE empid = $2 RETURNING empid`, [empname, empid]);

        return result.rows[0].empid;
    }
    async function updateEmployeeDesignation({ empid, designation })
    {
        let result = await pool.query(`UPDATE ${employeeTable} SET designation = $1 WHERE empid = $2 RETURNING empid`, [designation, empid])
        return result.rows[0].empid;
    }

    async function getEmployeebyId({ empid })
    {
        let result = await pool.query(`SELECT * FROM ${employeeTable} WHERE empid = $1`, [empid]);
        return result.rows[0];
    }
    async function getEmployeeByCompanyId({ cid })
    {
        let result = await pool.query(`SELECT * FROM ${employeeTable} WHERE cid = $1`, [cid]);
        return result.rows;
    }
    async function deleteEmployeeById({ empid })
    {
        let result = await pool.query(`DELETE FROM ${employeeTable} WHERE empid = $1 RETURNING empid`, [empid])
        return result.rows[0].empid;
    }
    async function deleteEmployeeByCompanyId({ cid })
    {       
        let result = await pool.query(`DELETE FROM employee WHERE cid = $1`, [cid]);
        return;
    }
    async function updateVerificationStatus({ empid, status })
    {
        console.log(empid, " ", status);

        let result = await pool.query(`UPDATE ${employeeTable} SET isverified = $1 WHERE empid = $2 RETURNING empid`, [status, empid]); 
        console.log(result.rows);
        return result.rows[0].empid;
    }
    async function isPasswordValid({ email, password })
    {
        let result = await pool.query(`SELECT empid FROM ${employeeTable} WHERE password = $1 AND email = $2`, [password, email])

        return result.rows.length;
    }
    async function isEmployeeVerified({ email })
    {
        let result = await pool.query(`SELECT empid FROM ${employeeTable} WHERE isverified = $1 AND email = $2`, ['true', email]);

        return result.rows.length;
    }
    async function isEmailExist({ email })
    {
        let result = await pool.query(`SELECT * FROM ${employeeTable} WHERE email = $1`, [email]);
       
        return result.rows[0];
    }
}