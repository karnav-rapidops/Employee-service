module.exports = function makeSearchSessionsAction({
    searchSessions,
})
{
    return async function searchSessionsAction(req, res)
    {
        try {
           let searchField = req.params.searchField;
           let searchValue = req.params.searchValue;
           let empid = req.params.empid;
           let sortingOrder = req.body.sortingOrder;

            let sessionsList = await searchSessions({ searchField, searchValue, empid, sortingOrder })
            
           res.send(sessionsList);
           
        }
        catch(error) {
            res.send(error.message);
        }
    }
    
}