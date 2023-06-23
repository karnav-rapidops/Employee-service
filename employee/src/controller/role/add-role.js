module.exports = function makeAddRoleAction({
    addRole
})
{
    return async function addRoleAction(req, res)
    {
        const roleName = req.body.roleName;
        const permission = req.body.permission;
        const companyId = req.body.companyId;
        const isMaster = req.body.isMaster;

        const insertedRoleId = await addRole({ roleName, permission, companyId, isMaster })

        res.status(201).send(insertedRoleId);
    }
}