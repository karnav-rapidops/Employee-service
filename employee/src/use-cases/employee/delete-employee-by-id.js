module.exports = function makeDeleteEmployeeById({
    deleteEmployeeByIdDb,
    validationError,
    Joi,
})
{
    return async function deleteEmployeeById({ empid })
    {
        const {error} = validateDeleteEmployeeById({ empid })

        if(error)
            throw new validationError(error.message);

        let deletedEmpId = await deleteEmployeeByIdDb({ empid });
        return deletedEmpId;
    }
    function validateDeleteEmployeeById({ empid } )
    {
        const schema = Joi.object({
            empid: Joi.string().required(),
        })
        return schema.validate({ empid })
    }
}