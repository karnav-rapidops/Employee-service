module.exports = function makeUpdateEmployeeDesignationAction({
    updateEmployeeDesignation,
    Joi,
})
{
    return async function updateEmployeeDesignationAction(req, res)
    {
        try {
            let empid = req.params.id;
            let designation = req.body.designation;

            const { error } = validateUpdateEmployeeDesignationAction({ empid, designation })
            
            if(error)
                return res.status(400).send({"validation error": error.details[0].message})

            let updatedEmpId = await updateEmployeeDesignation({ empid, designation });

            res.send(updatedEmpId);
        }
        catch(error) {
            res.send(error.message);
        }
    }
    function validateUpdateEmployeeDesignationAction({ empid, designation } )
    {
        const schema = Joi.object({
            designation: Joi.string().min(1).max(15).required(),
            empid: Joi.string().required(),
        })
        return schema.validate({ empid, designation })
    }
}