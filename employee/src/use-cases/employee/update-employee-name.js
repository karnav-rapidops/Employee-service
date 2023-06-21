module.exports = function makeUpdateEmployeeName({
    updateEmployeeNameDb,
    validationError,
    Joi,
})
{
    return async function updateEmployeeName({ id, name })
    {   
        const {error} = validateUpdateEmployeeName({ id, name })

        if(error)
            throw new validationError(error.message);

        let updatedEmpId = await updateEmployeeNameDb({ id, name });
        return updatedEmpId;
    }
    function validateUpdateEmployeeName({ id, name } )
    {
        const schema = Joi.object({
            name: Joi.string().min(1).max(15).required(),
            id: Joi.string().required(),
        })
        return schema.validate({ id, name })
    }
}