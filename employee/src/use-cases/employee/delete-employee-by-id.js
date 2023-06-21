module.exports = function makeDeleteEmployeeById({
    deleteEmployeeByIdDb,
    validationError,
    Joi,
})
{
    return async function deleteEmployeeById({ id })
    {
        validateInput({ id });

        return await deleteEmployeeByIdDb({ id });
    }
    function validateInput({ id })
    {
        const schema = Joi.object({
            id: Joi.string().required(),
        })

        const {error} = schema.validate({ id });

        if(error)
            throw new validationError(error.message);
    }
}