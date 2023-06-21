module.exports = function makeGetEmployeeById({
    getEmployeeByIdDb,
    validationError,
    Joi,
})
{
    return async function getEmployeeById({ id })
    {
        const {error} = validateGetEmployeeById({ id })
        if(error)
            throw new validationError(error.message);

        let employeeDetails = await getEmployeeByIdDb({ id });
        return employeeDetails;
    }
    function validateGetEmployeeById({ id } )
    {
        const schema = Joi.object({
            id: Joi.string().required(),
        })
        return schema.validate({ id })
    }
}
