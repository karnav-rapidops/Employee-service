module.exports = function makeUpdateEmployeeNameAction({
    updateEmployeeName,
    Joi,
})
{
    return async function updateEmployeeNameAction(req, res)
    {
        try {
            let id = req.params.id;
            let name = req.body.name;
             
            let updatedEmpId = await updateEmployeeName({ id, name });

            res.send(updatedEmpId);
        }
        catch(error) {
            res.status(500).send(error.message);
        }
    }
}