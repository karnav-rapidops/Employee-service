const employeeTable = 'employee';

module.exports = function makeEmployeeDbMethods({
    pool,
    databaseError,
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

    async function insertEmployee({ name, companyId, designation, email, password })
    {
        try {
            const result = await pool.query(`INSERT INTO ${employeeTable} (cid, empname, designation, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING empid`, [companyId, name, designation, email, password]);        
            return result.rows[0].empid;
        } catch (error) {
            throw new databaseError('Error while quering!')    
        }

       
    }
    async function updateEmployeeName({ id, name })
    {
        try {
            const result = await pool.query(`UPDATE ${employeeTable} SET empname = $1 WHERE empid = $2 RETURNING empid`, [name, id]);
            return result.rows[0].empid;
        } catch (error) {
            throw new databaseError('Error while quering!')
        }
        
    }
    async function updateEmployeeDesignation({ id, designation })
    {
        try {
            const result = await pool.query(`UPDATE ${employeeTable} SET designation = $1 WHERE empid = $2 RETURNING empid`, [designation, id])
            return result.rows[0].empid;
        } catch (error) {
            throw new databaseError('Error while quering!') 
        }
        
    }

    async function getEmployeebyId({ id })
    {
        try {
            const result = await pool.query(`SELECT * FROM ${employeeTable} WHERE empid = $1`, [id]);
            return result.rows[0];
        } catch (error) {
            throw new databaseError('Error while quering!')
        }
        
    }
    async function getEmployeeByCompanyId({ id })
    {
        try {
            const result = await pool.query(`SELECT * FROM ${employeeTable} WHERE cid = $1`, [id]);
            return result.rows;
        } catch (error) {
            throw new databaseError('Error while quering!')
        }
        
    }
    async function deleteEmployeeById({ id })
    {
        try {
            const result = await pool.query(`DELETE FROM ${employeeTable} WHERE empid = $1 RETURNING empid`, [id])
            return result.rows[0].empid; 
        } catch (error) {
            throw new databaseError('Error while quering!')
        }
        
    }
    async function deleteEmployeeByCompanyId({ id })
    {    
        try {
            const result = await pool.query(`DELETE FROM employee WHERE cid = $1 RETURNING cid`, [id]);
        return result.rows[0].cid;
        } catch (error) {
            throw new databaseError('Error while quering!')
        }   
        
    }
    async function updateVerificationStatus({ id, status })
    {
        try {
            const result = await pool.query(`UPDATE ${employeeTable} SET isverified = $1 WHERE empid = $2 RETURNING empid`, [status, id]); 
        return result.rows[0].empid;
        } catch (error) {
            throw new databaseError('Error while quering!')
        }
        
    }
    async function isPasswordValid({ email, password })
    {
        try {
            const result = await pool.query(`SELECT empid FROM ${employeeTable} WHERE password = $1 AND email = $2`, [password, email])
            return result.rows.length;
        } catch (error) {
            throw new databaseError('Error while quering!')
        }
        
    }
    async function isEmployeeVerified({ email })
    {
        try {
            const result = await pool.query(`SELECT empid FROM ${employeeTable} WHERE isverified = $1 AND email = $2`, ['true', email]);

            return result.rows.length; 
        } catch (error) {
            throw new databaseError('Error while quering!')
        }
        
    }
    async function isEmailExist({ email })
    {
        try {
            const result = await pool.query(`SELECT * FROM ${employeeTable} WHERE email = $1`, [email]);
       
            return result.rows[0];  
        } catch (error) {
            throw new databaseError('Error while quering!')
        }
        
    }
}