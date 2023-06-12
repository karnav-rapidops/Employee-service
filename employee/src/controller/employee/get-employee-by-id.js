module.exports = function makeGetEmployeeByIdAction({
    getEmployeeById,
    Joi,
})
{
    return async function getEmployeeByIdAction(req, res)
    {
        try {
            let empid = req.params.id;

            const { error } = validateGetEmployeeByIdAction({ empid })

            if(error)
                return res.status(400).send({"validation error": error.details[0].message})

            let employeeDetails = await getEmployeeById({ empid });

            res.send(employeeDetails);
        }
        catch(error){
            res.send(error.message);
        }    
    }
    function validateGetEmployeeByIdAction({ empid } )
    {
        const schema = Joi.object({
            empid: Joi.string().required(),
        })
        return schema.validate({ empid })
    }
}