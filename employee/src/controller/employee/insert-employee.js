module.exports = function makeInsertEmployeeAction({
    insertEmployee,
    Joi,
})
{
    return async function insertEmployeeAction(req, res)
    {
        try 
        {
            let empname = req.body.empname;
            let designation = req.body.designation;
            let email = req.body.email; 
            let cname = req.body.companyname;
            let password = req.body.password;

            const {error} = validateInsertEmployeeAction({ empname, designation, email, cname, password })

            if(error)
                return res.status(400).send({"validation error": error.details[0].message})
                
            console.info('\nINSERT-EMPLOYEE-CONTROLLER');
            console.info("Employee name: ", empname);
            console.info("designation: ", designation);
            console.info("email: ", email);
            console.info("company name: ", cname)
        
            let employeeid = await insertEmployee({ empname, designation, email, cname, password });

            // console.info('INSERT-Employee-CONTROLLER-RESULT: ', Employeeid);

            res.status(201).send(employeeid);  
        }
        catch(err) {
            console.error(err);
            res.status(err.httpStatusCode).send(err.message);
        }   
    }
    function validateInsertEmployeeAction({ empname, designation, email, cname, password})
    {
        const schema = Joi.object({
            empname: Joi.string().min(1).max(15).required(),
            designation: Joi.string().min(1).max(15).required(),
            email: Joi.string().required(),
            cname: Joi.string().min(1).max(15).required(),
            password: Joi.string().max(15).required(),
        })
        return schema.validate({ empname, designation, email, designation, cname, password })
    }
}