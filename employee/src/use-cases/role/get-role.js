module.exports = function makeGetRole({
    getRoleDb,
})
{
    return async function getRole({ roleId })
    {
        return await getRoleDb({ roleId });
    }
}