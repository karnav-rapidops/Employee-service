module.exports = function makeDeleteEmployeeByCompanyId({
    deleteEmployeeByCompanyIdDb,
    validationError,
    Joi,
})
{
    return async function deleteEmployeeByCompanyId({ cid })
    {
        // console.info("\nDELETE-EMPLOYEE-BY-COMPANY-ID-USECASE")
        // console.info("company id: ", cid);

        const {error} = validateDeleteEmployeeByCompanyId({ cid })

        if(error)
            throw new validationError(error.message);

        let deletedCompanyId = await deleteEmployeeByCompanyIdDb({ cid });
        return deletedCompanyId;
    }
    function validateDeleteEmployeeByCompanyId({ cid } )
    {
        const schema = Joi.object({
            cid: Joi.string().required(),
        })
        return schema.validate({ cid })
    }
}