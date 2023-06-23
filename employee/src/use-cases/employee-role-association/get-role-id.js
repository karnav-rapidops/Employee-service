module.exports = function makeGetRole({
    getRoleIdDb,
    objectNotFoundError,
})
{
    return async function getRole({ employeeId })
    {   

            console.log("\nGET-ROLE-USECASE: ", employeeId);
            const roleId = await getRoleIdDb({ employeeId });

            if(!roleId)
                throw new objectNotFoundError('Role does not exist!')    
            return roleId;
    }
}