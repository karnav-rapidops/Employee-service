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

            const {error} = validateInput({ name, designation, email, companyName, password })

            if(error)
                return res.status(400).send({"validation error": error.details[0].message})
                
            let employeeid = await insertEmployee({ name, designation, email, companyName, password });
            
            res.status(201).send(employeeid);  
        }
        catch(err) {
            console.error(err);
            res.status(err.httpStatusCode).send(err.message);
        }   
    }
    function validateInput({ name, designation, email, companyName, password})
    {
        const schema = Joi.object({
            name: Joi.string().min(1).max(15).required(),
            designation: Joi.string().min(1).max(15).required(),
            email: Joi.string().required(),
            companyName: Joi.string().min(1).max(15).required(),
            password: Joi.string().max(15).required(),
        })
        return schema.validate({ name, designation, email, designation, companyName, password })
    }
}