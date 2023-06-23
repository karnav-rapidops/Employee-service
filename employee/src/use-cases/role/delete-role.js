module.exports = function makeDeleteRole({
    deleteRoleDb,
})
{
    return async function deleteRole({ roleId })
    {
        return await deleteRoleDb({ roleId });   
    }
}