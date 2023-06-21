module.exports = function makeUpdateEmployeeNameAction({
    updateEmployeeName,
    Joi,
})
{
    return async function updateEmployeeNameAction(req, res)
    {
        try {
            let id = req.params.id;
            let name = req.body.name;

            console.log("Update-employee-name-usecase");

            const { error } = validateInput({ id, name })
            
            if(error)
                return res.status(400).send({"validation error": error.details[0].message})
                
            let updatedEmpId = await updateEmployeeName({ id, name });

            res.send(updatedEmpId);
        }
        catch(error) {
            res.send(error.message);
        }
    }
    function validateInput({ id, name } )
    {
        const schema = Joi.object({
            name: Joi.string().min(1).max(15).required(),
            id: Joi.string().required(),
        })
        return schema.validate({ id, name })
    }
}