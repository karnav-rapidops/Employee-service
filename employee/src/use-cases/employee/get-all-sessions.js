module.exports = function makeGetAllSessions({
    getAllSessionsDb,
})
{
    return async function getAllSessions({ empid, columnToSort, sortingOrder })
    {
        let sessionsList = await getAllSessionsDb({ empid, columnToSort, sortingOrder });
        return sessionsList;
    }   
}