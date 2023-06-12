module.exports = function makeSearchSessions({
    searchSessionsDb,   
})
{
    return async function searchSessions({ searchField, searchValue, empid, sortingOrder })
    {
        let sessionsList = await searchSessionsDb({ searchField, searchValue, empid, sortingOrder });
        return sessionsList;
    }   
}