module.exports = function makeGetEmployeeByIdAction({
    getEmployeeById,
    Joi,
})
{
    return async function getEmployeeByIdAction(req, res)
    {
        try {
            let id = req.params.id;
            let employeeDetails = await getEmployeeById({ id });

            res.status(200).send(employeeDetails);
        }
        catch(error){
            res.status(500).send(error.message);
        }    
    }
}