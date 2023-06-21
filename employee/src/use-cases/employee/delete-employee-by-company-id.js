module.exports = function makeDeleteEmployeeByCompanyId({
    deleteEmployeeByCompanyIdDb,
    validationError,
    Joi,
})
{
    return async function deleteEmployeeByCompanyId({ id })
    {
        validateInput({ id })
        return await deleteEmployeeByCompanyIdDb({ id });
    }
    
    function validateInput({ id } )
    {
        const schema = Joi.object({
            id: Joi.string().required(),
        })

        const {error} = schema.validate({ id })

        if(error)
            throw new validationError(error.message);
    }
}