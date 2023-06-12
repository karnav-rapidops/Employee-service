module.exports = function makeGetAllSessionsAction({
    getAllSessions,
})
{
    return async function getAllSessionsAction(req, res)
    {
        try {
           let empid = req.params.id;
            let columnToSort = req.body.columnToSort;
            let sortingOrder = req.body.sortingOrder;

           let sessionsList = await getAllSessions({ empid, columnToSort, sortingOrder });

           res.send(sessionsList);
           
        }
        catch(error) {
            res.send(error.message);
        }
    }
    
}