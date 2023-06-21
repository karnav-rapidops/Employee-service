module.exports = function makeGetEmployeeByIdAction({
    getEmployeeById,
    Joi,
})
{
    return async function getEmployeeByIdAction(req, res)
    {
        try {
            let id = req.params.id;
            
            validateInput({ id })

            let employeeDetails = await getEmployeeById({ id });

            res.send(employeeDetails);
        }
        catch(error){
            res.send(error.message);
        }    
    }
    function validateInput({ id } )
    {
        const schema = Joi.object({
            id: Joi.string().required(),
        })

        const { error } = schema.validate({ id })
        if(error)
            return res.status(400).send({"validation error": error.details[0].message})
    }
}