module.exports = function makeUpdateEmployeeDesignation({
    updateEmployeeDesignationDb,
    validationError,
    Joi,
})
{
    return async function updateEmployeeDesignation({ id, designation })
    {   
        const {error} = validateInput({ id, designation })

        if(error)
        {
            console.log(error.message);
            throw new validationError(error.message);
        }

        let updatedEmpId = await updateEmployeeDesignationDb({ id, designation });
        return updatedEmpId;
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