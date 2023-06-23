module.exports = function makeDeleteEmployeeByIdAction({
    deleteEmpployeeById,  
    Joi,
})
{
    return async function deleteEmployeeByIdAction(req, res)
    {
        try {
            let id = req.params.id;
            let deletedEmpId = await deleteEmpployeeById({ id });

            res.status(200).send(deletedEmpId);
        }
        catch(error) {
            res.status(error.httpStatusCode).send(error.message)
        }
    }
}