module.exports = function makeGetEmployeeById({
    getEmployeeByIdDb,
    validationError,
    Joi,
})
{
    return async function getEmployeeById({ empid })
    {
        const {error} = validateGetEmployeeById({ empid })
        if(error)
            throw new validationError(error.message);

        let employeeDetails = await getEmployeeByIdDb({ empid });
        return employeeDetails;
    }
    function validateGetEmployeeById({ empid } )
    {
        const schema = Joi.object({
            empid: Joi.string().required(),
        })
        return schema.validate({ empid })
    }
}
