module.exports = function makeDeleteEmployeeByCompanyIdAction({
    deleteEmployeeByCompanyId,  
    Joi,
})
{
    return async function deleteEmployeeByCompanyIdAction(req, res)
    {
        try {
            let id = req.params.id;

            const { error } = validateInput({ id })
            if(error)
            {
                console.log("error",error)
                res.status(400).send({"validation error": error.details[0].message})
            }

            let deletedCompanyId = await deleteEmployeeByCompanyId({ id });

            res.send(deletedCompanyId);
        }
        catch(error) {
            console.log("catch",error);
            res.send(error.message);
        }
    }
    function validateInput({ id } )
    {
        const schema = Joi.object({
            id: Joi.string().required(),
        })
        return schema.validate({ id })
    }
}