module.exports = function makeUpdateEmployeeName({
    updateEmployeeNameDb,
    validationError,
    Joi,
})
{
    return async function updateEmployeeName({ empid, empname })
    {   
        const {error} = validateUpdateEmployeeName({ empid, empname })

        if(error)
            throw new validationError(error.message);

        let updatedEmpId = await updateEmployeeNameDb({ empid, empname });
        return updatedEmpId;
    }
    function validateUpdateEmployeeName({ empid, empname } )
    {
        const schema = Joi.object({
            empname: Joi.string().min(1).max(15).required(),
            empid: Joi.string().required(),
        })
        return schema.validate({ empid, empname })
    }
}