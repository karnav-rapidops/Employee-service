module.exports = function makeUpdateEmployeeNameAction({
    updateEmployeeName,
    Joi,
})
{
    return async function updateEmployeeNameAction(req, res)
    {
        try {
            let empid = req.params.id;
            let empname = req.body.name;

            const { error } = validateUpdateEmployeeNameAction({ empid, empname })
            
            if(error)
                return res.status(400).send({"validation error": error.details[0].message})
                
            let updatedEmpId = await updateEmployeeName({ empid, empname });

            res.send(updatedEmpId);
        }
        catch(error) {
            res.send(error.message);
        }
    }
    function validateUpdateEmployeeNameAction({ empid, empname } )
    {
        const schema = Joi.object({
            empname: Joi.string().min(1).max(15).required(),
            empid: Joi.string().required(),
        })
        return schema.validate({ empid, empname })
    }
}