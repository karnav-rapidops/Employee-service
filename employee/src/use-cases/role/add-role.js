module.exports = function makeAddRole({
    addRoleDb,
})
{
    return async function addRole({ roleName, permission, companyId, isMaster })
    {
        permission = JSON.stringify(permission);
        
        return await addRoleDb({ roleName, permission, companyId, isMaster })
    }
}