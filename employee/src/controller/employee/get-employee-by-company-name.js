module.exports = function makeGetEmployeeByCompanyNameAction({
    getEmployeeByCompanyName,
    Joi,
})
{
    return async function getEmployeeByCompanyNameAction(req, res)
    {
        try {

            let companyName = req.params.companyName;

            validateInput({ companyName, res });

            let employeeList = await getEmployeeByCompanyName({ companyName });

            res.send(employeeList);
        }
        catch(error) {
            res.send(error.message);
        }
    }
    function validateInput({ companyName, res })
    {
        const schema = Joi.object({
            companyName: Joi.string().min(1).max(15).required(),
        })
         
        const { error } = schema.validate({ companyName })
        if(error)
             return res.status(400).send({"validation error": error.details[0].message})
    }
}