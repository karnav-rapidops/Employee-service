module.exports = function makeDeleteEmployeeByCompanyIdAction({
    deleteEmployeeByCompanyId,  
    Joi,
})
{
    return async function deleteEmployeeByCompanyIdAction(req, res)
    {
        try {
            let id = req.params.id;
            let deletedCompanyId = await deleteEmployeeByCompanyId({ id });

            res.send(deletedCompanyId);
        }
        catch(error) {
            console.log("catch",error);
            res.status(error.httpStatusCode).send(error.message);
        }
    }
}