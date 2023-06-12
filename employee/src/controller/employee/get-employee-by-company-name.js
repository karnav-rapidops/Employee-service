module.exports = function makeGetEmployeeByCompanyNameAction({
    getEmployeeByCompanyName,
    Joi,
})
{
    return async function getEmployeeByCompanyNameAction(req, res)
    {
        try {
            let companyname = req.params.companyname;

            console.info("\nGET-EMPLOYEE-BY-COMPANY-NAME-CONTROLLER")
            console.info("company name: ", companyname);

            const { error } = validateGetEmployeeByCompnayNameAction({ cname: companyname })
            if(error)
                return res.status(400).send({"validation error": error.details[0].message})

            let employeeList = await getEmployeeByCompanyName({ cname: companyname });

            res.send(employeeList);
        }
        catch(error) {
            res.send(error.message);
        }
    }
    function validateGetEmployeeByCompnayNameAction({ cname } )
    {
        const schema = Joi.object({
            cname: Joi.string().min(1).max(15).required(),
        })
        return schema.validate({ cname })
    }
}