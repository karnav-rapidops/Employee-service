module.exports = function makeDeleteSessionsAction({
    deleteSessions,
})
{
    return async function getAllSessionsAction(req, res)
    {
        try {
            let sessionsToDelete = req.body.sessionsToDelete;

            let employeeId = await deleteSessions({ sessionsToDelete });

           res.status(200).send(employeeId);
           
        }
        catch(error) {
            res.status(error.httpStatusCode).send(error.message);
        }
    }
    
}