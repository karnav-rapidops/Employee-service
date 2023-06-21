module.exports = function makeUpdateEmployeeDesignationAction({
    updateEmployeeDesignation,
    Joi,
})
{
    return async function updateEmployeeDesignationAction(req, res)
    {
        try {
            let id = req.params.id;
            let designation = req.body.designation;

            const { error } = validateInput({ id, designation })
            
            if(error)
                return res.status(400).send({"validation error": error.details[0].message})

            let updatedEmpId = await updateEmployeeDesignation({ id, designation });

            res.send(updatedEmpId);
        }
        catch(error) {
            res.send(error.message);
        }
    }
    function validateInput({ id, designation } )
    {
        const schema = Joi.object({
            id: Joi.string().required(),
            designation: Joi.string().min(1).max(15).required(),
        })
        return schema.validate({ id, designation })
    }
}