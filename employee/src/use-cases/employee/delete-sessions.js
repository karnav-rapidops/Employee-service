module.exports = function makeDeleteSessions({
    deleteSessionsDb,
})
{
    return async function deleteSessions({ sessionsToDelete })
    {
        let employeeId;
        for(let session of sessionsToDelete)
        {
            employeeId = await deleteSessionsDb({ sessionid: session.id }); 
        }

        return employeeId;
    }   
}