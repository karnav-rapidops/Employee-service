module.exports = function makeDeleteSessionsAction({
    deleteSessions,
})
{
    return async function getAllSessionsAction(req, res)
    {
        try {
           let sessionsToDelete = req.body.sessionsToDelete;

            let employeeId = await deleteSessions({ sessionsToDelete });

           res.send(employeeId);
           
        }
        catch(error) {
            res.send(error.message);
        }
    }
    
}