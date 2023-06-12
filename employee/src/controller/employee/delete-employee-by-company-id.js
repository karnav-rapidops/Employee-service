module.exports = function makeDeleteEmployeeByCompanyIdAction({
    deleteEmployeeByCompanyId,  
    Joi,
})
{
    return async function deleteEmployeeByCompanyIdAction(req, res)
    {
        try {
            let cid = req.params.id;

            console.info("\nDELETE-EMPLOYEE-BY-COMPANY-ID-CONTROLLER");
            console.info("company id: ", cid);

            const { error } = validateDeleteEmployeeByCompanyId({ cid })
            if(error)
                return res.status(400).send({"validation error": error.details[0].message})

            let deletedCompanyId = await deleteEmployeeByCompanyId({ cid });

            res.send("deletedCompanyId");
        }
        catch(error) {
            res.send(error.message);
        }
    }
    function validateDeleteEmployeeByCompanyId({ cid } )
    {
        const schema = Joi.object({
            cid: Joi.string().required(),
        })
        return schema.validate({ cid })
    }
}