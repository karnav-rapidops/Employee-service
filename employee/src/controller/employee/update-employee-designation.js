module.exports = function makeUpdateEmployeeDesignationAction({
    updateEmployeeDesignation,
    Joi,
})
{
    return async function updateEmployeeDesignationAction(req, res)
    {
        try {
            let id = req.params.id;
            let designation = req.body.designation;
            
            let updatedEmpId = await updateEmployeeDesignation({ id, designation });
        
            res.status(200).send(updatedEmpId);
        }
        catch(error) {
            res.status(500).send(error.message);
        }
    }
}