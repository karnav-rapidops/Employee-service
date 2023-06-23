module.exports = function makeDeleteRoleAction({
    deleteRole
})
{
    return async function deleteRoleAction(req, res)
    {   
        const roleId = req.params.id;

        await deleteRole({ roleId });

        res.status(200).send("Role deleted!");
    }
}