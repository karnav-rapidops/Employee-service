module.exports = function makeDeleteEmployeeByIdAction({
    deleteEmpployeeById,  
    Joi,
})
{
    return async function deleteEmployeeByIdAction(req, res)
    {
        try {
            let id = req.params.id;

            const { error } = validateInput({ id })
            if(error)
                return res.status(400).send({"validation error": error.details[0].message})

            let deletedEmpId = await deleteEmpployeeById({ id });

            res.send(deletedEmpId);
        }
        catch(error) {
            res.send(error.message)
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