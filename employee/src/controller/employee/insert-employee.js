module.exports = function makeInsertEmployeeAction({
    insertEmployee,
    Joi,
})
{
    return async function insertEmployeeAction(req, res)
    {
        try 
        {
            let name = req.body.name;
            let designation = req.body.designation;
            let email = req.body.email; 
            let companyName = req.body.companyName;
            let password = req.body.password;

            let employeeId = await insertEmployee({ name, designation, email, companyName, password });
            
            res.status(201).send(employeeId);  
        }
        catch(error) {
            console.error(error);
            res.status(error.httpStatusCode).send(error.message);
        }   
    }
}