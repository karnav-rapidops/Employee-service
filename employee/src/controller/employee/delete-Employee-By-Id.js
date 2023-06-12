module.exports = function makeDeleteEmployeeByIdAction({
    deleteEmpployeeById,  
    Joi,
})
{
    return async function deleteEmployeeByIdAction(req, res)
    {
        try {
            let empid = req.params.id;

            const { error } = validateDeleteEmployeeByIdAction({ empid })
            if(error)
                return res.status(400).send({"validation error": error.details[0].message})

            let deletedEmpId = await deleteEmpployeeById({ empid });

            res.send(deletedEmpId);
        }
        catch(error) {
            res.send(error.message)
        }
    }
    function validateDeleteEmployeeByIdAction({ empid } )
    {
        const schema = Joi.object({
            empid: Joi.string().required(),
        })
        return schema.validate({ empid })
    }
}