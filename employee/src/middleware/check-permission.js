module.exports = function makeCheckPermission({
    getRole,
    getRoleId, 
    permissions,
})
{
    return async function checkPermission(req, res, next)
    {  
        const employeeId = req.id; 
        
        // get roleId associated with employeeId
        const roleId = await getRoleId({ employeeId });
        console.log("RoleId", roleId);
        // get role details of this roleId
        const role = await getRole({ roleId });

        // create key to get value from enum object
        const path = req.route.path;
        const httpMethod = req.method;
        const key = httpMethod + ':' + path;
        console.log("permission",permissions);
        console.log("key",key)
        // check if employee is master or not
        // if its master not need to check permission otherwise check it.
        console.log("here..", role);
        if(!role.ismaster)
        {
            const apiName = permissions[key];

            // Get api name from permissions enum
            console.log(role);
            console.log("in if",apiName);
            console.log(permissions[key])

            // Now check employee's permissions using api name that is it allowed or not
            if(!role.permission[apiName]) {
                res.status(403).send("This action is not allowed!");
            }
        }
        next();
    }
}   