module.exports = function makeGetEmployeeByCompnayName({
    getEmployeeByCompanyIdDb,
    getCompanyIdByName,
    validationError,
    Joi,
})
{
    return async function makeGetEmployeeByCompnayName({ cname })
    {   
        console.info("\nGET-EMPLOYEE-BY-COMPANY-ID-USECASE");
        console.info("company name: ", cname);

        const {error} = validateGetEmployeeByCompnayName({ cname })
        if(error)
            throw new validationError(error.message);

        let companyid = await getCompanyIdByName({ cname });
    
        let employeeList = await getEmployeeByCompanyIdDb({ cid: companyid});

        console.info("GET-EMPLOYEE-BY-COMPANY-ID-USECASE-RESULT: ", employeeList);

        return employeeList;
    }
    function validateGetEmployeeByCompnayName({ cname } )
    {
        const schema = Joi.object({
            cname: Joi.string().min(1).max(15).required(),
        })
        return schema.validate({ cname })
    }
}