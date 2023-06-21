module.exports = function makeGetEmployeeByCompnayName({
    getEmployeeByCompanyIdDb,
    getCompanyIdByName,
    validationError,
    Joi,
})
{
    return async function getEmployeeByCompnayName({ companyName })
    {   
        
        validateInput({ companyName });

        let companyId = await getCompanyIdByName({ companyName });
    
        let employeeList = await getEmployeeByCompanyIdDb({ id: companyId});

        return employeeList;
    }   

    function validateInput({ companyName } )
    {
        const schema = Joi.object({
            companyName: Joi.string().min(1).max(15).required(),
        })
        const {error} = schema.validate({ companyName })
        if(error)
            throw new validationError(error.message);
    }
}