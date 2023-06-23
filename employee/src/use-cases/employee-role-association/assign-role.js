module.exports = function makeAssignRole({
    assignRoleDb,
})
{
    return async function assignRole({ roleId, employeeId })
    {
        return await assignRoleDb({ roleId, employeeId })
    }
}