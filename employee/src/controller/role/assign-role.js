module.exports = function makeAssignRoleAction({
    assignRole,
})
{
    return async function assignRoleAction(req, res)
    {
        const employeeId = req.body.employeeId;
        const roleId = req.body.roleId;

        await assignRole({ employeeId, roleId });

        res.status(201).send("Role Assigned");
    }
}